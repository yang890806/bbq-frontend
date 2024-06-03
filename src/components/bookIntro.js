import Image from 'next/image';
import getConfig from 'next/config';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@mui/material';
import Avatar from '@/components/avatar';
import convertImage from '@/components/convertImage';

const { 
	publicRuntimeConfig: { imageWidth, imageHeight } 
} = getConfig();

function BookIntro({ data, className }) {

	const { t } = useTranslation();
	const profileSize = [30, 30];
	const [authors, setAuthors] = useState([]);

	const handleAuthors = () => {
		var newAuthors = [data?.creator];
		if (data?.users && (data?.users).length > 0) {
			newAuthors = [...newAuthors, ...data?.users];
		}
		setAuthors(newAuthors);
	};

	useEffect(() => {
		handleAuthors();
	}, [data]);

	return (
		<Row className={className}>
			{/* 繪本圖片 */}
			<Col xs={{span: 3}} className='flex justify-center'>
				<Image 
					src={convertImage(data?.eventImage) ?? '/book-example.JPG'} // TEST 若沒有image會報錯，所以找一個類似空白的圖片，把'/book-example.JPG'，讓他比較美觀
					width={imageWidth / 2.2}
					height={imageHeight / 2.2}
					alt='Image'
					className='rounded shadow object-cover'
				/>
			</Col>
			<Col className='my-6'>
				<Row>
					<Col className='text-2xl font-bold my-2'>{data?.eventTitle}</Col>
				</Row>
				<Row>
					<Col className='flex'>
						<div className='mr-2'>{t('Authors')}</div>
						{
							authors?.map((author, i) => 
								<Tooltip title={author?.username} arrow>
									<div>
									<Avatar 
										avatar={author?.avatar} 
										username={author?.username} 
										width={profileSize[0]}
										height={profileSize[1]}
										className='mr-1'
									/>
									</div>
								</Tooltip>
							)
						}
					</Col>
				</Row>
				<Row>
					<Col className='max-h-24 overflow-y-scroll whitespace-pre-wrap'>
						{data?.eventIntro}
					</Col>
				</Row>
			</Col>
		</Row>
	);
}

export default BookIntro;
