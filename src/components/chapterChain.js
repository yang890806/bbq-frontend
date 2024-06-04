import { useState } from 'react';
import { getCookie } from 'cookies-next';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import { HashLoader } from 'react-spinners';
import moment from 'moment';
import Swal from 'sweetalert2';
import ImageUpload from '@/components/imageUpload';
import axios from '@/utils/axios';
import styles from '@/styles/book.module.css';

function ChapterChain({ chapter, className }) {

	const { t } = useTranslation();

	const [showLoading, setShowLoading] = useState(false);
	const [showOriContent, setShowOriContent] = useState(true);
	const [image, setImage] = useState('');
	const [text, setText] = useState('');

	const goToChain = (e) => {
		e.stopPropagation();
		setShowOriContent(false);
	};

	const getNow = () => {
		return moment().format('YYYY-MM-DD HH:mm:ss');
	};

	const showSuccessMsg = () => {
		Swal.fire({
			'title': t('Success'), 
			'text': t('The page is created.'), 
			'icon': 'success', 
			'confirmButtonColor': '#F5C265', 
		});
	};

	const showErrorMsg = () => {
		Swal.fire({
			'title': t('Error'), 
			'text': t('The page fails to be created.'), 
			'icon': 'error', 
			'confirmButtonColor': '#F5C265', 
		});
	};

	const sendPage = async() => {

		// 取得現在時間
		const now = getNow();

		var formData = new FormData();
		formData.append('uId', getCookie('user-id'));
		formData.append('cId', chapter.cId);
		formData.append('imageContent', image);
		formData.append('textContent', text);
		formData.append('pageCreateTime', now);

		setShowLoading(true);
		await axios.post('/page', formData, { headers: {'Content-Type': 'multipart/form-data'} })
			.then((res) => {
				setShowLoading(false);
				if (res.status === 200) {
					showSuccessMsg();
				}
				else {
					showErrorMsg();
				}
			})
			.catch((error) => {
				showErrorMsg();
				console.log('Create page error:', error);
			});
	};

	const handleCancel = () => {
		clearPage();
		setShowOriContent(true);
	};

	const clearPage = () => {
		setImage('');
		setText('');
	};

	return (
		<>
		<Row className={`bg-gray-200 shadow-sm rounded-md p-3 my-2 ${className}`}>
			{showOriContent ? (
				<>
				{/* 空白框框 */}
				<Col xs={{span: 4, offset: 1}}>
					<div className='bg-white border-dashed border-3 border-gray-300 w-96 h-80'></div>
				</Col>
				<Col className='py-2 px-6 flex flex-col justify-between'>
					<Row>
						<Col>
							<Row>
								<Col className='mb-2 text-xl'>{chapter?.chapterTitle}</Col>
							</Row>
							<Row>
								<Col className='text-md whitespace-pre-wrap'>{chapter?.chapterIntro}</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col className='flex justify-end'>
							<div className={styles.btn} onClick={(e) => goToChain(e)}>
								{ t('I want to chain!') }
							</div>
						</Col>
					</Row>
				</Col>
				</>
			): (
				<>
				<Col xs={{span: 4, offset: 1}}>
					<div className='w-96 h-80 flex items-center justify-center'>
						<ImageUpload 
							image={image}
							handleImage={setImage}
							className='bg-white border-dashed border-3 border-gray-300' iconColor='text-gray-300'
						/>
					</div>
				</Col>
				<Col className='py-6 px-6 flex flex-col justify-between'>
					<Row>
						<Col>
							<Row>
								<Col className='mb-2 text-xl'>{chapter?.chapterTitle}</Col>
							</Row>
							<Row>
								<Col className='text-md'>{chapter?.chapterIntro}</Col>
							</Row>
							<Row>
								<Col>
									<textarea
										className='border border-gray-300 rounded w-full py-2 px-3 mt-3 mb-2 outline-none'
										rows='6'
										placeholder={t('Enter text...')}
										value={text}
										onChange={(e) => setText(e.target.value)}
									></textarea>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col className='flex justify-end'>
							<div className={`mx-2 ${styles.cancelBtn}`} onClick={handleCancel}>
								{ t('Cancel') }
							</div>
							<div className={styles.btn} onClick={sendPage}>
								{ t('Post') }
							</div>
						</Col>
					</Row>
				</Col>
				</>
			)}
		</Row>
		{/* Loading動畫 */}
		{showLoading && (
			<div className='w-screen h-screen absolute z-[999] top-0 left-0 flex justify-center items-center bg-opacity-75 bg-black'>
				<HashLoader color='#F5C265' loading={showLoading} aria-label='Loading' />
			</div>
		)}
		</>
	);
}

export default ChapterChain;
