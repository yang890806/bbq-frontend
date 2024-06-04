import Head from 'next/head';
import NavBar from '@/components/navbar';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useEffect,useState } from 'react';
import { Container, Row, Col, Button, Dropdown, DropdownButton, Form, FloatingLabel, InputGroup } from 'react-bootstrap';
import { HashLoader } from 'react-spinners';
import getLoggedUser from '@/auth/getLoggedUser';
import AllProcessing from '@/components/cards/allProcessing';
import AllFinished from '@/components/cards/allFinished';
import axios from '@/utils/axios';
import convertImage from '@/components/convertImage';
import styles from '@/styles/book-brief.module.css';

function Books() {

	const [books, setBooks] = useState({
		finished: [],
		chain: [],
		vote: [],
	});

	const header={

		chain: {
			ch:'所有接龍',
			en:'All Solitaire'
		},
		
		vote: {
			ch:'所有投票',
			en:'All Votes'
		},

		finished: {
			ch:'所有出版刊物',
			en:'All Publication'
		},
	};

	const [bookInfo1, setBookInfo1] = useState([]);
	const [bookInfo2, setBookInfo2] = useState([]);
	const [bookInfo3, setBookInfo3] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [showLoading, setShowLoading] = useState(false);

	const getURL = () => {
		const user = getLoggedUser();
		return user ? `/allEvent/${user}` : '/allPublicEvent';
	};

	const fetchBook = async() => {
		try {
			setShowLoading(true);

			const url = getURL();

			// 分別發送三個不同的請求
			const response1 = await axios.get(url, { params: { eventStatus: 1 } });
			const response2 = await axios.get(url, { params: { eventStatus: 2 } });
			const response3 = await axios.get(url, { params: { eventStatus: 3 } });

			// 將回應資料分別賦值給不同的狀態
			setBookInfo1(response1.data);
			setBookInfo2(response2.data);
			setBookInfo3(response3.data);

			// 所有請求完成後設置 dataLoaded 為 true
			setDataLoaded(true);
			setShowLoading(false);
		} catch (error) {
			console.log('Fetch book error:', error);
		}
	};

	useEffect(() => {
		fetchBook();
	}, []);
	
	useEffect(() => {
		if (dataLoaded) {
			setBooks(prevBooks => ({
				...prevBooks,
				chain: bookInfo1,
				vote: bookInfo2,
				finished: bookInfo3,
			}));
		}
	}, [dataLoaded, bookInfo1, bookInfo2, bookInfo3]);
	
	const { t } = useTranslation();
	const [activeTab, setActiveTab] =useState('finished');
	const [query, setQuery] = useState('');
	const [searchingtype , setsearchingtype] = useState('eventTitle');

	const router = useRouter();
	const { status } = router.query;

	useEffect(() => {
		if (status) {
			setActiveTab(status);
		}
	}, [status]);

	const filteredItems =  books[activeTab]?.filter((item) =>
		item[searchingtype] && item[searchingtype].toLowerCase().includes(query.toLowerCase()));
	
	const renderedItems = filteredItems?.map((book, index) => {
		if (activeTab === 'finished') {
			return (
				<Col xs={2} md={3}>
					<AllFinished
						key={index}
						book={book?.eId}
						title={book?.eventTitle}
						author={book?.creator?.username}
						profile={book?.creator?.avatar}
						image={convertImage(book?.eventImage)}
						viewer={book?.viewCount}
					/>
				</Col>
			);
		} 
		else if (activeTab === 'chain') {
			return (
				<Col xs={2} md={3}>
					<AllProcessing
						key={index}
						book={book?.eId}
						title={book?.eventTitle}
						author={book?.creator?.username}
						profile={book?.creator?.avatar}
						image={convertImage(book?.eventImage)}
						targetDate={book?.time?.submitTime}
						state={0}
						part={book?.totalChapterNum}
					/>
				</Col>
			);
		} else if (activeTab === 'vote') {
			return (
				<Col xs={2} md={3}>
					<AllProcessing
						key={index}
						book={book?.eId}
						title={book?.eventTitle}
						author={book?.creator?.username}
						profile={book?.creator?.avatar}
						image={convertImage(book?.eventImage)}
						targetDate={book?.time?.voteTime}
						state={1}
						part={book?.totalChapterNum}
					/>
				</Col>
			);
		}
	});

	return (
		<>
		<Head>
			<title>BBQ</title>
			<meta
				property='og:description'
				content='BBQ - BoundlessBrushQuill'
			/>
		</Head>
		<NavBar/>   

		<Container>
				{/* <!-- Latest Publication Section --> */}
				<Row >
					<Col className='d-flex justify-content-between align-items-center mt-5'  >
						<div>
							<h2 className='text-2xl'>{header[activeTab].en}</h2>
							<h2 className={`text-4xl font-bold mb-4 ${activeTab === 'finished' ? 'text-red' : 'text-green'}`}>{header[activeTab].ch}</h2>
						</div>

						<div className='ml-auto'>
							<Button className={(activeTab === 'finished') ? styles.activeToggleBtn : styles.toggleBtn} onClick={() => setActiveTab('finished')}>
								{t('Publication')}
							</Button>
							<Button className={(activeTab === 'chain') ? styles.activeToggleBtn : styles.toggleBtn} onClick={() => setActiveTab('chain')}>
								{t('Solitaire')}
							</Button>
							<Button className={(activeTab === 'vote') ? styles.activeToggleBtn : styles.toggleBtn} onClick={() => setActiveTab('vote')}>
								{t('Vote')}
							</Button>
						</div>

						<div className='ml-1'>
							<InputGroup>   
								<FloatingLabel
										controlId='floatingInput'
 										label={(() => {
											switch (searchingtype) {
												case 'eventTitle':
													return `${t( 'Search by Book Title...' )}`;
												case 'creator.username':
													return`${t( 'Search by Authors...' )}`;
												default:
													return `以${searchingtype}搜尋...`;
											}
										})()}
								>
								<Form.Control
									placeholder=''  
									onChange={(e)=>{setQuery(e.target.value)}}  
								/>
								</FloatingLabel>
								<DropdownButton 
									title={
										searchingtype === 'eventTitle'
										? `${t('Book Title')}`
										: searchingtype === 'creator.username'
										? `${t( 'Authors' )}`
										: '代碼'
									}
									id='input-group-dropdown-1'
									variant='warning'
								>   
									<Dropdown.Item onClick={() => setsearchingtype('eventTitle')}>{t('Book Title')}</Dropdown.Item>
									<Dropdown.Item onClick={() => setsearchingtype('creator.username')}>{t('Authors')}</Dropdown.Item>
								</DropdownButton>
							</InputGroup>
						</div>
					</Col>
				</Row>

			<Row className='g-4'>
				{renderedItems}
			</Row>
		</Container>
		{/* Loading動畫 */}
		{showLoading && (
			<div className='w-screen h-screen absolute z-[999] top-0 left-0 flex justify-center items-center bg-opacity-75 bg-black'>
				<HashLoader color='#F5C265' loading={showLoading} aria-label='Loading' />
			</div>
		)}
		</>
	)
}

export default Books;
