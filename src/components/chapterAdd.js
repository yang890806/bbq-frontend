import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Swal from 'sweetalert2';
import axios from '@/utils/axios';
import styles from '@/styles/book-create.module.css';

function ChapterAdd({ book, totalChapters }) {

	const { t } = useTranslation();

	const [clicked, setClicked] = useState(false);
	const [title, setTitle] = useState('');
	const [intro, setIntro] = useState('');
	const [submitTime, setSubmitTime] = useState('');
	const [voteTime, setVoteTime] = useState('');

	const getNow = () => {
		return moment().format('YYYY-MM-DD HH:mm:ss');
	};

	const convertTimeFormat = (time) => {
		return moment(time).format('YYYY-MM-DD HH:mm:ss');
	};

	const handleSubmitTime = (time) => {
		const formattedTime = convertTimeFormat(time);
		setSubmitTime(formattedTime);
	};

	const handleVoteTime = (time) => {
		const formattedTime = convertTimeFormat(time);
		setVoteTime(formattedTime);
	};

	const handleCancel = () => {
		setTitle('');
		setIntro('');
		setSubmitTime('');
		setVoteTime('');
		setClicked(false);
	};

	const showSuccessMsg = () => {
		Swal.fire({
			'title': t('Success'), 
			'text': t('The chapter has been created.'), 
			'icon': 'success', 
			'confirmButtonColor': '#F5C265', 
		}).then((result) => {
			if (result.isConfirmed) {
				window.location.replace(window.location.href);
			}
		});
	};

	const showErrorMsg = () => {
		Swal.fire({
			'title': t('Error'), 
			'text': t('The chapter fails to be created.'), 
			'icon': 'error', 
			'confirmButtonColor': '#F5C265', 
		});
	};

	const sendAdd = async() => {

		const now = getNow();

		const params = {
			eId: book, 
			chapterTitle: title, 
			chapterIntro: intro, 
			createTime: now, 
			submitTime: submitTime, 
			voteTime: voteTime, 
			pageNumber: totalChapters + 1, 
		};

		await axios.post('/chapter', params, {})
			.then((res) => {
				if (res.status === 200) {
					showSuccessMsg();
				}
				else {
					showErrorMsg();
				}
			})
			.catch((error) => {
				console.log('Create chapter error:', error);
			});
	};

	return clicked ? (
		<Row className={styles.addChapterBlock}>
			<Col>
				{/* 章節名稱 */}
				<Row>
					<Col>
						{ `${t('Chapter Name')}:` }
						<input 
							className={`px-2 ${styles.chapterNameInput}`}
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</Col>
				</Row>
				<Row>
					{/* 章節描述 */}
					<Col className='mt-3'>
						<textarea 
							className={styles.chapterIntroInput} 
							value={intro} 
							onChange={(e) => setIntro(e.target.value)}
							placeholder={`${t('Describe')}...`}
						/>
					</Col>

					{/* 時間設定區塊 */}
					<Col>
						<Row><Col className='mt-3'>
							{/* 投稿時間 */}
							<Row className='my-4'>
								<Col className='flex'>
									<div className={styles.chapterTimeAttribute} style={{width: '100px'}}>{ `${t('Posting Time')}:` }</div>
									<input 
										id='posting-time' 
										type='datetime-local' 
										className={styles.datetimeInput}
										value={submitTime}
										onChange={(e) => handleSubmitTime(e.target.value)}
									/>
								</Col>
							</Row>
							{/* 投票時間 */}
							<Row className='my-4'>
								<Col className='flex'>
									<div className={styles.chapterTimeAttribute} style={{width: '100px'}}>{ `${t('Voting Time')}:` }</div>
									<input 
										id='posting-time' 
										type='datetime-local' 
										className={styles.datetimeInput}
										value={voteTime}
										onChange={(e) => handleVoteTime(e.target.value)}
									/>
								</Col>
							</Row>
						</Col></Row>
						<Row>
							<Col className='flex px-24'>
								<div className={`mx-2 ${styles.cancelBtn}`} onClick={handleCancel}>
									{ t('Cancel') }
								</div>
								<div className={styles.saveBtn} onClick={sendAdd}>
									{ t('Add') }
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			</Col>
		</Row>
	): (
		<Row className={`text-center ${styles.addChapterBlock}`} onClick={() => setClicked(true)}>
			<Col>+ {t('Add Chapter')}</Col>
		</Row>
	);
}

export default ChapterAdd;
