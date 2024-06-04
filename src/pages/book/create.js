import Head from 'next/head';
import Image from 'next/image';
import getConfig from 'next/config';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { Button, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faLock, faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { HashLoader } from 'react-spinners';
import moment from 'moment';
import Swal from 'sweetalert2';
import getLoggedUser from '@/auth/getLoggedUser';
import axios from '@/utils/axios';
import NavBar from '@/components/navbar';
import ImageUpload from '@/components/imageUpload';
import BaseModal from '@/components/modal';
import styles from '@/styles/book-create.module.css';

const { 
	publicRuntimeConfig: { frontendRoot, imageWidth, imageHeight } 
} = getConfig();

function BookCreate() {

	const { t } = useTranslation();

	const [bookImage, setBookImage] = useState('');
	const [bookTitle, setBookTitle] = useState('');
	const [bookIntro, setBookIntro] = useState('');
	const [chapterTitle, setChapterTitle] = useState('');
	const [chapterIntro, setChapterIntro] = useState('');
	const [submitTime, setSubmitTime] = useState('');
	const [voteTime, setVoteTime] = useState('');

	const [permission, setPermission] = useState('PUBLIC');
	const [showCode, setShowCode] = useState(false);
	const [code, setCode] = useState('');
	const [copied, setCopied] = useState(false);

	const [newBook, setNewBook] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [showLoading, setShowLoading] = useState(false);

	const showErrorMsg = () => {
		Swal.fire({
			'title': t('Error'), 
			'text': `${bookTitle} ${t('fails to be created.')}`, 
			'icon': 'error', 
			'confirmButtonColor': '#F5C265', 
		});
	};

	const handleCancel = () => {
		setBookTitle('');
		setBookIntro('');
		setChapterTitle('');
		setChapterIntro('');
		setSubmitTime('');
		setVoteTime('');
		setPermission('PUBLIC');
		setShowCode(false);
		setCode(null);
		setCopied(false);
	};

	const showWarningMsg = () => {
		Swal.fire({
			'title': t('Please log in first.'), 
			'icon': 'warning', 
			'confirmButtonColor': '#F5C265', 
		});
	};

	// 發送創建書本API
	const createBook = async() => {

		const creator = getLoggedUser();
		if (!creator) {
			showWarningMsg();
			return;
		}

		// 取得現在時間
		const now = getNow();

		var formData = new FormData();
		formData.append('eventImage', bookImage);
		formData.append('creatorId', creator);
		formData.append('eventTitle', bookTitle);
		formData.append('eventIntro', bookIntro);
		if (code) {
			formData.append('eventKey', code);
		}
		formData.append('chapterTitle', chapterTitle);
		formData.append('chapterIntro', chapterIntro);
		formData.append('createTime', now);
		formData.append('submitTime', submitTime);
		formData.append('voteTime', voteTime);

		// 傳送request
		setShowLoading(true);
		await axios.post('/event', formData, { headers: {'Content-Type': 'multipart/form-data'} })
			.then((res) => {
				setShowLoading(false);
				if (res.status === 200) {
					setNewBook(res?.data?.eventData);
					console.log('new book:', res?.data?.eventData);
					setShowModal(true);
				}
				else {
					showErrorMsg();
				}
			})
			.catch((error) => {
				showErrorMsg();
				console.log('Create book error:', error);
			});
	};

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

	// 隨機產生活動碼
	const randomGenCode = (length) => {
		let s = '';
		Array.from({ length }).some(() => {
		  s += Math.random().toString(36).slice(2);
		  return s.length >= length;
		});
		return s.slice(0, length);
	};

	const closeModal = () => {
		setShowModal(false);
		window.location.href = `${frontendRoot}/book/${newBook}`;
	};

	// 若權限為「私人」，則隨機產生並顯示活動碼
	useEffect(() => {
		if (permission == 'PRIVATE') {
			setShowCode(true);
			setCopied(false);
			setCode(randomGenCode(7));
		}
		else {
			setShowCode(false);
		}
	}, [permission]);

	const onCopyCode = () => {
		setCopied(true);

		const timer = setTimeout(() => {
			setCopied(false);
		}, 2000);
		return () => clearTimeout(timer);
	};

	const showPermissionInfo = () => {
		const icon = (permission === 'PUBLIC') ? faEarthAmericas : faLock;
		const iconText = (permission === 'PUBLIC') ? t('Public') : t('Private');

		return (
			<>
			<FontAwesomeIcon icon={icon} size='xs'/>
			<span className='px-1 text-sm'>{iconText}</span>
			</>
		);
	};

	return (
		<>
		<Head>
			<title>BBQ</title>
			<meta
				property="og:description"
				content="BBQ - BoundlessBrushQuill"
			/>
		</Head>
		<NavBar/>
		<Container>
			{/* 創建書本資訊 */}
			<Row className='my-8'>
				<Col xs={4}>
					<ImageUpload image={bookImage} handleImage={setBookImage} />
				</Col>
				<Col className='flex flex-col justify-center'>
					<Row>
						<Col className='flex text-lg'>
							<div className={styles.attribute}>{ t('Book Title') }</div>
							<input value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} className={styles.titleInput}/>
						</Col>
					</Row>
					<Row className='my-3'>
						<Col className='flex text-lg'>
							<div className={styles.attribute}>{ t('Introduction') }</div>
							<textarea value={bookIntro} onChange={(e) => setBookIntro(e.target.value)} className={styles.introInput} placeholder={`${t('Describe')}...`}/>
						</Col>
					</Row>
					<Row className='my-3'>
						<Col className='flex text-lg'>
							<div className={styles.attribute}>{ t('Permission') }</div>
							<select id='permission' 
								value={permission}
								className={styles.permissionSelect} 
								onChange={(e) => setPermission(e.target.value)}
							>
								<option value='PUBLIC'>{ t('Public') }</option>
								<option value='PRIVATE'>{ t('Private') }</option>
							</select>
						</Col>
					</Row>
				</Col>
			</Row>

			{/* 創建第一章節標題 */}
			<Row>
				<Col>
					<div className='w-fit px-3 py-1 bg-yellow text-black text-center text-lg font-bold rounded'>
						{ t('Create the First Chapter!') }
					</div>
				</Col>
			</Row>

			{/* 創建章節區塊 */}
			<Row>
				<Col xs={11} className={`${styles.chapterSection} text-lg`}>
					{/* 章節名稱 */}
					<Row>
						<Col>
							{ `${t('Chapter Name')}:` }
							<input 
								className={styles.chapterNameInput} 
								value={chapterTitle} 
								onChange={(e) => setChapterTitle(e.target.value)}
							/>
						</Col>
					</Row>
					<Row>
						{/* 章節描述 */}
						<Col>
							<Row>
								<Col className='mt-3'>
									<textarea 
										className={styles.chapterIntroInput} 
										value={chapterIntro} 
										onChange={(e) => setChapterIntro(e.target.value)}
										placeholder={`${t('Describe')}...`}
									/>
								</Col>
							</Row>
						</Col>
						{/* 時間設定區塊 */}
						<Col>
							<Row><Col className='mt-3'>
								{/* 投稿時間 */}
								<Row className='my-4'>
									<Col className='flex'>
										<div className={styles.chapterTimeAttribute}>{ `${t('Posting Time')}:` }</div>
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
										<div className={styles.chapterTimeAttribute}>{ `${t('Voting Time')}:` }</div>
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
						</Col>
					</Row>
				</Col>
			</Row>

			{/* 按鈕區塊 */}
			<Row className='mb-3'>
				<Col className='text-center'>
					<Button className={`${styles.cancelBtn}`} onClick={handleCancel}>{ t('Cancel') }</Button>
					<Button className={`${styles.saveBtn}`} onClick={createBook}>{ t('Save') }</Button>
				</Col>
			</Row>
		</Container>

		{/* 創建書本成功 Modal */}
		{showModal && (
			<BaseModal className='text-md text-center' show={showModal} handleClose={closeModal}>
				{/* 繪本圖 */}
				<Row>
					<Col className='flex justify-center'>
						<Image 
							src={URL.createObjectURL(bookImage)}
							width={imageWidth / 2.5}
							height={imageHeight / 2.5}
							alt='Image'
							className='rounded shadow object-cover'
						/>
					</Col>
				</Row>
				{/* 書名 */}
				<Row className='mt-3'>
					<Col>
						<span className='text-3xl font-bold'>{bookTitle}</span>
					</Col>
				</Row>
				{/* 權限 */}
				<Row className='my-1'>
					<Col className={(permission === 'PUBLIC') ? 'text-green' : 'text-red'}>
						{showPermissionInfo()}
					</Col>
				</Row>
				{/* 活動碼 */}
				{showCode && (
					<Row>
						<Col className='flex justify-center text-sm'>
							<CopyToClipboard text={code} onCopy={() => onCopyCode()}>
								<div className={styles.codeSection}>
									{ `${t('Code')}: ${code}`}
									<FontAwesomeIcon icon={ faCopy } className="ml-2 mt-1 cursor-pointer" />
								</div>
							</CopyToClipboard>
							{copied && (<span className='ml-2 mt-1 text-dark-cream'>{ t('Copied') }</span>)}
						</Col>
					</Row>
				)}
				{/* 書本簡介 */}
				<Row className='my-2'>
					<Col>
						<div className='max-h-24 overflow-y-scroll whitespace-pre-wrap'>{bookIntro}</div>
					</Col>
				</Row>
				<Divider className='my-3 border-dashed border-black'/>
				<Row>
					<Col>
						<div className='font-bold rounded-md bg-yellow w-fit px-3 py-1'>
							{`${t('Chapter 1')}. ${chapterTitle}`}
						</div>
					</Col>
				</Row>
				<Row className='my-2'>
					<Col>
						<div 
							className='px-2 py-2 text-left rounded-md max-h-20 overflow-y-scroll whitespace-pre-wrap text-dark-cream'
						>
							{chapterIntro}
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className={`text-green ${styles.timeSection}`}>
							<span className={styles.timeTitle}>{t('Posting Time')}</span>
							<span>{submitTime}</span>
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className={`text-red ${styles.timeSection}`}>
							<div className={styles.timeTitle}>{t('Voting Time')}</div>
							<span>{voteTime}</span>
						</div>
					</Col>
				</Row>
				<Row className='mt-3'>
					<Col>
						<Button className={`${styles.confirmBtn}`} onClick={closeModal}>{ t('OK') }</Button>
					</Col>
				</Row>
			</BaseModal>
		)}

		{/* Loading動畫 */}
		{showLoading && (
			<div className='w-screen h-screen absolute z-[999] top-0 left-0 flex justify-center items-center bg-opacity-75 bg-black'>
				<HashLoader color='#F5C265' loading={showLoading} aria-label='Loading' />
			</div>
		)}
		</>
	);
}

export default BookCreate;
