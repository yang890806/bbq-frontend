import Head from 'next/head';
import getConfig from 'next/config';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import NavBar from '@/components/navbar';
import BookIntro from '@/components/bookIntro';
import ChapterComplete from '@/components/chapterComplete';
import ChapterVoting from '@/components/chapterVoting';
import ChapterChain from '@/components/chapterChain';
import ChapterAdd from '@/components/chapterAdd';
import axios from '@/utils/axios';
import styles from '@/styles/book.module.css';

const { 
	publicRuntimeConfig: { frontendRoot } 
} = getConfig();

function BookIndex() {

	const { t } = useTranslation();
	const router = useRouter();
    const { book } = router.query;

	const [bookInfo, setBookInfo] = useState({});
	const [chapters, setChapters] = useState([]);
	const [expandChapters, setExpandChapters] = useState([]);

	// 顯示錯誤訊息
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

	const initExpandChapters = (length) => {
		const init = Array(length).fill(false);
		setExpandChapters(init);
	};

	const fetchBook = async() => {
		if (book) {
			await axios.get(`/event/${book}`, {}, {})
				.then((res) => {
					if (res.status === 200) {
						setBookInfo(res.data);
						fetchChapters();
					}
					else {
						showErrorMsg(t('The event is not found...'));
					}
				})
				.catch((error) => {
					console.log('Fetch book error:', error);
				});
		}
	};

	const fetchChapters = async() => {
		if (book) {
			await axios.get(`/allChapter/${book}`, {}, {})
				.then((res) => {
					console.log('chapters:', res.data);
					if (res.status === 200) {
						setChapters(res.data);
						initExpandChapters(res.data?.length);
					}
					else {
						showErrorMsg(t('The event has no any chapter...'));
					}
				})
				.catch((error) => {
					console.log('Fetch chapters error:', error);
				});
		}
	};

	// 顯示章節狀態
	const showChapterStatus = (status, expandStatus) => {
		switch(status) {
			case 1:
				// TEST 倒數計時需要改掉
				var color = 'text-dark-cream';
				var statusText = <span className={color}>{t('接龍中')} | 9:25:33</span>;
				break;
			case 2:
				var color = 'text-red';
				var statusText = <span className={color}>{t('投票進行中')} | 9:25:33</span>;
				break;
			default:
				color = '';
				var statusText = <span>{t('已完成')}</span>;
				break;
		}

		return <>{statusText} <FontAwesomeIcon icon={(expandStatus) ? faChevronUp : faChevronDown} className={`ml-2 ${color}`}/></>;
	};

	const showExpandChapter = (chapter) => {
		switch(chapter.chapterStatus) {
			case 1:
				return <ChapterChain chapter={chapter}/>;
			case 2:
				return <ChapterVoting chapter={chapter}/>;
			default:
				return <ChapterComplete chapter={chapter}/>;
		}
	};

	const updateExpand = (e, index) => {
		setExpandChapters(expandChapters.map((status, i) => 
			i === index ? !status : status
		));
	};

	useEffect(() => {
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

			{/* 書本簡介 */}
			<BookIntro data={bookInfo} className='my-6'/>

			{/* 章節 */}
			{chapters?.map((chapter, i) => 
				<Row key={i} className={styles.chapterBlock}>
					<Col>
						<Row className='cursor-pointer' onClick={(e) => updateExpand(e, i)}>
							<Col>
								<span>{i + 1}. {chapter?.chapterTitle}</span>
								{chapter?.chapterStatus === 3 && <span className='ml-8'>By. {chapter?.finishedpage?.pageCreator?.username}</span>}
							</Col>
							<Col className='text-end'>
								{showChapterStatus(chapter?.chapterStatus)}
							</Col>
						</Row>
						{expandChapters[i] && showExpandChapter(chapter)}
					</Col>
				</Row>
			)}

			{/* 新增章節 */}
			<ChapterAdd book={book} totalChapters={chapters?.length}/>
		</Container>
		</>
	);
}

export default BookIndex;
