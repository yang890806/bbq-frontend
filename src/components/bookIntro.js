import Image from 'next/image';
import getConfig from 'next/config';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import getLoggedUser from '@/auth/getLoggedUser';
import Avatar from '@/components/avatar';
import convertImage from '@/components/convertImage';
import axios from '@/utils/axios';
import styles from '@/styles/book.module.css';

const { 
	publicRuntimeConfig: { frontendRoot, imageWidth, imageHeight } 
} = getConfig();

function BookIntro({ data, className }) {

	const { t } = useTranslation();
	const profileSize = [20, 20];
	const [authors, setAuthors] = useState([]);

	const checkCreator = () => {
		return getLoggedUser() === data?.creator?.uId;
	};

	const handleAuthors = () => {
		var newAuthors = [data?.creator];
		if (data?.users && (data?.users).length > 0) {
			newAuthors = [...newAuthors, ...data?.users];
		}
		setAuthors(newAuthors);
	};

	const showSuccessMsg = () => {
		Swal.fire({
			title: t('Post Book Successfully!'),
			icon: 'success',
			confirmButtonColor: '#F5C265',
		}).then(() => {
			window.location.replace(`${frontendRoot}/book/${data?.eId}/overview`);
		});
	};

	const showErrorMsg = () => {
		Swal.fire({
			title: t('Failed to post book...'),
			text: 'Please try it again later.',
			icon: 'error',
			confirmButtonColor: '#F5C265',
		});
	};

	const postBook = async() => {
		const bookId = data?.eId;
		if (bookId) {
			await axios.put(`/event/${bookId}`, { isPublish: 1 }, {})
				.then((res) => {
					if (res.status === 200) {
						showSuccessMsg();
					}
					else {
						showErrorMsg();
					}
				})
				.catch((error) => {
					console.log('Post book error:', error);
				});
		}
	};

	useEffect(() => {
		handleAuthors();
	}, [data]);

	return (
		<Row className={className}>
			{/* 繪本圖片 */}
			<Col xs={{span: 3}} className='flex justify-center'>
				<Image 
					src={convertImage(data?.eventImage) ?? '/image-not-found.jpg'}
					width={imageWidth / 2.2}
					height={imageHeight / 2.2}
					alt='Image'
					className='rounded shadow object-cover'
				/>
			</Col>
			<Col className='my-6'>
				{checkCreator() && 
				<Row>
					<Col className='flex text-2xl font-bold my-2'>
						{data?.eventTitle}
						<div className={`ml-12 text-base font-bold ${styles.btn}`} onClick={postBook}>
							{ t('Post!') }
						</div>
					</Col>
				</Row>
				}
				<Row>
					<Col className='flex items-center'>
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
