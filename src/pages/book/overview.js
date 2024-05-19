import Head from 'next/head';
import Image from 'next/image';
import getConfig from 'next/config';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEye, faPlay } from '@fortawesome/free-solid-svg-icons';
import NavBar from '@/components/navbar';
import ImageCarousel from '@/components/imageCarousel';
import styles from '@/styles/book-overview.module.css';

const { publicRuntimeConfig } = getConfig();

function BookOverview() {

	const { t } = useTranslation();
	const profileSize = [35, 35];

	// TEST
	const exampleImages = ['/book-example.jpg', '/book-example-2.jpg'];

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
					<Link href='/book/home' className='no-underline'>
						<div className={styles.btn} style={{width: '90px'}}>
							<FontAwesomeIcon icon={ faChevronLeft } className="mr-2 mt-1 flex flex-row" />
							{ t('Back') }
						</div>
					</Link>
				</Col>
			</Row>
			<Row>
				<Col>
					<ImageCarousel 
						images={exampleImages} 
						width={publicRuntimeConfig.imageWidth}
						height={publicRuntimeConfig.imageHeight}
					/>
				</Col>
				<Col className='flex flex-col justify-center'>
					<Row>
						<Col className='text-4xl font-bold my-3'>Book Title</Col>
					</Row>
					<Row className='my-2'>
						<Col className='flex text-lg'>
							<span className='mr-3'>{ t('Creator') }</span>
							<Image 
								src='/profile-1.JPG' 
								width={profileSize[0]}
								height={profileSize[1]}
								alt='Example of Profile'
								className='rounded-full shadow-sm'
							/>
							<span className='mx-2'>Puppy</span>
						</Col>
					</Row>
					<Row className='my-2'>
						<Col className='flex text-lg'>
							<span className='mr-3'>{ t('Authors') }</span>
							<Image 
								src='/profile-2.jpeg' 
								width={profileSize[0]}
								height={profileSize[1]}
								alt='Example of Profile'
								className='rounded-full shadow-sm mr-1'
							/>
							<Image 
								src='/profile-2.jpeg' 
								width={profileSize[0]}
								height={profileSize[1]}
								alt='Example of Profile'
								className='rounded-full shadow-sm mr-1'
							/>
						</Col>
					</Row>
					<Row>
						<Col className='h-24 overflow-y-scroll'>
							A student template for teachers to use introduce Book Creator to middle school students. A student template for teachers to use introduce Book Creator to middle school students. A student template for teachers to use introduce Book Creator to middle school students. A student template for teachers to use introduce Book Creator to middle school students. A student template for teachers to use introduce Book Creator to middle school students. A student template for teachers to use introduce Book Creator to middle school students. 
						</Col>
					</Row>
					<Row className='mt-12'>
						<Col>
							<div className={styles.view}>
								<FontAwesomeIcon icon={faEye} className="mr-2 mt-1 flex flex-row" />
								1,234
							</div>
						</Col>
						<Col>
							<Link href='/book/home' className='no-underline flex justify-end'>
								<div className={styles.btn} style={{width: '100px'}}>
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
