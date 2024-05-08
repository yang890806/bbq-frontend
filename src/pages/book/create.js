import Head from 'next/head';
import getConfig from 'next/config';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import NavBar from '@/components/navbar';
import styles from '@/styles/book-create.module.css';

const { publicRuntimeConfig } = getConfig();

function BookCreate() {

	const { t } = useTranslation();

	const [permission, setPermission] = useState('PUBLIC');
	const [showCode, setShowCode] = useState(false);
	const [code, setCode] = useState('');

	// 隨機產生活動碼
	const randomGenCode = (length) => {
		let s = '';
		Array.from({ length }).some(() => {
		  s += Math.random().toString(36).slice(2);
		  return s.length >= length;
		});
		return s.slice(0, length);
	};

	// 若權限為「私人」，則隨機產生並顯示活動碼
	useEffect(() => {
		if (permission == 'PRIVATE') {
			setShowCode(true);
			setCode(randomGenCode(7));
		}
		else {
			setShowCode(false);
		}
	}, [permission]);

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
			<Row className='my-12'>
				<Col xs={4}>
					<div 
						style={{width: `${publicRuntimeConfig.imageWidth / 1.5}px`, height: `${publicRuntimeConfig.imageHeight / 1.5}px`}}
						className='bg-zinc-200 rounded'
					></div>
				</Col>
				<Col className='flex flex-col justify-center'>
					<Row>
						<Col className='flex text-lg'>
							<div className={styles.attribute}>{ t('Book Title') }</div>
							<input className={styles.titleInput}/>
						</Col>
					</Row>
					<Row className='my-3'>
						<Col className='flex text-lg'>
							<div className={styles.attribute}>{ t('Introduction') }</div>
							<textarea className={styles.introInput} />
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
							{showCode && (
								<div className={styles.codeSection}>
									{ `${t('Code')}: ${code}`}
								</div>
							)}
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
							<input className={styles.chapterNameInput}/>
						</Col>
					</Row>
					<Row>
						{/* 章節描述 */}
						<Col>
							<Row>
								<Col className='mt-3'>
									<textarea className={styles.chapterIntroInput} placeholder={ `${t('Describe')}...` }/>
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
										<input id='posting-time' type='datetime-local' className={styles.datetimeInput}/>
									</Col>
								</Row>
								{/* 投票時間 */}
								<Row className='my-4'>
									<Col className='flex'>
										<div className={styles.chapterTimeAttribute}>{ `${t('Voting Time')}:` }</div>
										<input id='posting-time' type='datetime-local' className={styles.datetimeInput}/>
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
					<Button className={`${styles.cancelBtn} `}>{ t('Cancel') }</Button>
					<Button className={`${styles.saveBtn} `}>{ t('Save') }</Button>
				</Col>
			</Row>
		</Container>
		</>
	);
}

export default BookCreate;
