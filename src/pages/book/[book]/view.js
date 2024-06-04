import Head from 'next/head';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from '@mui/material';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import axios from '@/utils/axios';
import NavBar from '@/components/navbar';
import BookViewer from '@/components/bookViewer';
import styles from '@/styles/book.module.css';

const { 
	publicRuntimeConfig: { frontendRoot } 
} = getConfig();

function BookView() {
	const router = useRouter();
	const { book } = router.query;
	const { t } = useTranslation();

	const [bookInfo, setBookInfo] = useState({});
	const [pages, setPages] = useState([]);

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

	// 增加閱覽數
	const addViewCount = async() => {
		if (book) {
			await axios.put(`/event/viewCount/${book}`, {}, {})
				.then((res) => {
					if (res.status === 200) {
						fetchBook();
					}
				})
				.catch((error) => {
					console.log('Add view count error:', error);
				});
		}
	};

	// 取得書本資訊
	const fetchBook = async() => {
		if (book) {
			await axios.get(`/event/${book}`, {}, {})
				.then((res) => {
					if (res.status === 200) {
						if (res?.data?.isPublish === 1) {
							setBookInfo(res.data);
							fetchChapters();
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

	// 取得書本篇章
	const fetchChapters = async() => {
		if (book) {
			await axios.get(`/allChapter/${book}`, {}, {})
				.then((res) => {
					if (res.status === 200) {
						setPages(res.data);
					}
				})
				.catch((error) => {
					console.log('Fetch chapters error:', error);
				});
		}
	};

	// 初始化
	useEffect(() => {
		addViewCount();
		fetchBook();
	}, [book]);

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
					<Link href={`/book/${book}/overview`} className='no-underline'>
						<div className={styles.btn}>
							<FontAwesomeIcon icon={ faChevronLeft } className="mr-2 mt-1 flex flex-row" />
							{ t('Back') }
						</div>
					</Link>
				</Col>
				<Col xs={{span: 4, offset: 2}} className='text-4xl font-bold'>
					{ bookInfo.eventTitle }
				</Col>
			</Row>
			<Row>
				<Col className='flex justify-center'>
					{pages.length && <BookViewer pages={pages}/>}
				</Col>
			</Row>
		</Container>
		</>
	);
}

export default BookView;
