import Head from 'next/head';
import Image from 'next/image';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEye, faPlay } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from '@/utils/axios';
import NavBar from '@/components/navbar';
import Avatar from '@/components/avatar';
import convertImage from '@/components/convertImage';
import styles from '@/styles/book.module.css';

const { 
	publicRuntimeConfig: { frontendRoot, imageWidth, imageHeight } 
} = getConfig();

function BookOverview() {

	const router = useRouter();
    const { book } = router.query;

	const { t } = useTranslation();
	const profileSize = [30, 30];

	const [bookInfo, setBookInfo] = useState({});

	const showErrorMsg = (text) => {
		Swal.fire({
			'title': t('Oops...'), 
			'text': text, 
			'icon': 'error', 
			'confirmButtonColor': '#F5C265', 
		}).then(() => {
			window.location.replace(frontendRoot);
		});
	};

	const fetchBook = async() => {
		if (book) {
			await axios.get(`/event/${book}`, {}, {})
				.then((res) => {
					if (res.status === 200) {
						if (res?.data?.isPublish === 1) {
							res.data.eventImage = convertImage(res?.data?.eventImage);
							setBookInfo(res.data);
						}
						else {
							showErrorMsg(t('The book has not been published yet...'));
						}
					}
					else {
						showErrorMsg(t('The book is not found...'));
					}
				})
				.catch((error) => {
					console.log('Fetch book error:', error);
				});
		}
	};

	useEffect(() => {
		fetchBook();
	}, [book]);

	useEffect(() => {
		console.log('bookInfo:', bookInfo);
	}, [bookInfo]);

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
			<Row className='my-12'>
				<Col>
					<Link href='/' className={`no-underline w-fit ${styles.btn}`}>
						<FontAwesomeIcon icon={ faChevronLeft } className="mr-2 mt-1 flex flex-row" />
						{ t('Back') }
					</Link>
				</Col>
			</Row>
			<Row>
				<Col className='flex justify-center'>
					{bookInfo?.eventImage && (
						<Image 
							src={bookInfo?.eventImage}
							width={imageWidth}
							height={imageHeight}
							alt='Image'
							className='rounded shadow object-cover'
						/>
					)}
				</Col>
				<Col className='flex flex-col justify-center'>
					<Row>
						<Col className='text-4xl font-bold my-3'>{ bookInfo?.eventTitle }</Col>
					</Row>
					<Row className='my-2'>
						<Col className='flex text-lg items-center'>
							<div className={styles.userTitle}>{ t('Creator') }</div>
							<Avatar 
								avatar={bookInfo?.creator?.avatar} 
								username={bookInfo?.creator?.username} 
								width={profileSize[0]}
								height={profileSize[1]}
							/>
							<span className='mx-2'>{bookInfo?.creator?.username}</span>
						</Col>
					</Row>
					<Row className='my-2'>
						<Col className='flex text-lg items-center'>
							<div className={styles.userTitle}>{ t('Authors') }</div>
							{
								bookInfo?.users?.map((user, i) => 
									<Tooltip title={user?.username} arrow>
										<div>
										<Avatar 
											avatar={bookInfo?.creator?.avatar} 
											username={bookInfo?.creator?.username} 
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
					<Row className='mt-2'>
						<Col className='max-h-24 overflow-y-scroll'>{ bookInfo?.eventIntro }</Col>
					</Row>
					<Row className='mt-8'>
						<Col>
							<div className={styles.view}>
								<FontAwesomeIcon icon={faEye} className="mr-2 mt-1 flex flex-row" />
								{ bookInfo?.viewCount }
							</div>
						</Col>
						<Col>
							<Link href={`/book/${book}/view`} className='no-underline flex justify-end'>
								<div className={styles.btn}>
									{ t('Read') }
									<FontAwesomeIcon icon={faPlay} className="ml-2 mt-1 flex flex-row" />
								</div>
							</Link>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
		</>
	);
}

export default BookOverview;

