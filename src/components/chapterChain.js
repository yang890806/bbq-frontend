import Image from 'next/image';
import getConfig from 'next/config';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import ImageUpload from './imageUpload';
import styles from '@/styles/book.module.css';

const { 
	publicRuntimeConfig: { imageWidth, imageHeight } 
} = getConfig();

function ChapterChain({ chapter, className }) {

	const { t } = useTranslation();

	const [showOriContent, setShowOriContent] = useState(false);
	const [image, setImage] = useState('');

	const goToChain = (e) => {
		e.stopPropagation();
		setShowOriContent(false);
	};

	return (
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
								<Col className='text-md'>{chapter?.chapterIntro}</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col className='flex justify-end'>
							<div className={styles.btn} onClick={(e) => goToChain(e)}>
								{ t('我要接龍') }
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
										className="border border-gray-300 rounded w-full py-2 px-3 mt-3 mb-2 outline-none"
										rows="6"
										placeholder="輸入文字..."
									></textarea>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col className='flex justify-end'>
							<div className={`mx-2 ${styles.cancelBtn}`} onClick={(e) => goToChain(e)}>
								{ t('取消') }
							</div>
							<div className={styles.btn} onClick={(e) => goToChain(e)}>
								{ t('投稿') }
							</div>
						</Col>
					</Row>
				</Col>
				</>
			)}
		</Row>
	);
}

export default ChapterChain;
