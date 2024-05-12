import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import NavBar from '@/components/navbar';
import BookReader from '@/components/bookReader';
import styles from '@/styles/book.module.css';

// TEST
import pages from '@/mock/pages';

function BookView() {

	const { t } = useTranslation();

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
				<Col xs={3}>
					<Link href='/book/overview' className='no-underline'>
						<div className={styles.btn} style={{width: '90px'}}>
							<FontAwesomeIcon icon={ faChevronLeft } className="mr-2 mt-1 flex flex-row" />
							{ t('Back') }
						</div>
					</Link>
				</Col>
				<Col xs={{span: 4, offset: 2}} className='text-4xl font-bold'>
					Book Title
				</Col>
			</Row>
			<Row>
				<Col>
					<BookReader pages={pages}/>
				</Col>
			</Row>
		</Container>
		</>
	);
}

export default BookView;
