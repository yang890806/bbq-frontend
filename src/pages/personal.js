import Head from 'next/head';
import { useEffect,useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, ButtonGroup, ToggleButton  } from 'react-bootstrap';
import { Dropdown, DropdownButton, Form, FloatingLabel, InputGroup, Button } from 'react-bootstrap';
import { HashLoader } from 'react-spinners';
import NavBar from '@/components/navbar';
import axios from '@/utils/axios';
import convertImage from '@/components/convertImage';
import PersonalParticipate from '@/components/cards/personalParticipate';
import styles from '@/styles/book-brief.module.css';

function BookPersonal() {

	const { t } = useTranslation();

	const [books, setBooks] = useState({
		public:[],
		privacy:[]
	});

	const [bookInfo1, setBookInfo1] = useState([]);
	const [bookInfo2, setBookInfo2] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [showLoading, setShowLoading] = useState(false);
	
	const fetchBook = async() => {
		try {
			setShowLoading(true);

			// 分別發送三個不同的請求
			const response1 = await axios.get('/allCreatedEvent/2', {}, {});
			const response2 = await axios.get('/allUploadEvent/2', {}, {});
			const combinedData = response1.data.concat(response2.data);
			const publicevent = combinedData.filter(event => event.eventKey);
			const pravicyevent  = combinedData.filter(event =>!event.eventKey);

			setBookInfo1(pravicyevent);
			setBookInfo2(publicevent);

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
			public: bookInfo1,
			privacy: bookInfo2,
			
		}));
		}
	}, [dataLoaded, bookInfo1, bookInfo2]);

	const [activeTab, setActiveTab] = useState(0);
	const [state, setstate] =useState('public');
	const [query, setQuery] = useState('');
	const [searchingtype , setsearchingtype] = useState('eventTitle');

	const filteredItems = books[state].filter((item) => {
		if (activeTab === 'all') {
			return item[searchingtype] && item[searchingtype].toLowerCase().includes(query.toLowerCase());
		} else {
			return item.isPublish === activeTab && item[searchingtype] && item[searchingtype].toLowerCase().includes(query.toLowerCase());
		}
	});

	const handleChange = (event) => {
		const value = event.target.value;
		if (value === '1') {
			setstate('public');
			setsearchingtype('eventTitle');
		} else if (value === '2') {
			setstate('privacy');
		}
	};

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
			<Row>
				<Col className='d-flex justify-content-between align-items-center  mt-5' >
					{/* Title 顯示 */}
					<div>
						<h2 className='text-2xl'>My Events</h2>
						<h2 className='text-4xl font-bold mb-4'>我的活動</h2>

					</div>
					<div>
					<Form.Select className='ml-6 fs-7 mt-2' onChange={handleChange}>
						<option value='1' >{t('Public')}</option>
						<option value='2' >{t('Private')}</option>
					</Form.Select>
					</div>
					
					<div className='ml-auto'>
						<Button className={(activeTab === 'all') ? styles.activeToggleBtn : styles.toggleBtn} onClick={() => setActiveTab('all')}>
							{t('Show All')}
						</Button>
						<Button className={(activeTab === 0) ? styles.activeToggleBtn : styles.toggleBtn} onClick={() => setActiveTab(0)}>
							{t('Create')}
						</Button>
						<Button className={(activeTab === 1) ? styles.activeToggleBtn : styles.toggleBtn} onClick={() => setActiveTab(1)}>
							{t('Participate')}
						</Button>
					</div>  

					<div className='ml-3'>
						<InputGroup >   
							<FloatingLabel
								controlId='floatingInput'
								label={(() => {
									switch (searchingtype) {
										case 'eventTitle':
											return `${t( 'Search by Book Title...' )}`;
										case 'author':
											return `${t( 'Search by Authors...' )}`;
										case 'code':
											return `${t( 'Search by Activity Code...' )}`;
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
									: searchingtype === 'author'
									? `${t('Authors')}`
									: `${t('Code')}`
								}
								id='input-group-dropdown-1'
								variant='warning'
							>   
								<Dropdown.Item onClick={() => setsearchingtype('eventTitle')}>{t('Book Title')}</Dropdown.Item>
								{state === 'privacy' && (
									<Dropdown.Item onClick={() => setsearchingtype('eventKey')}>{t('Code')}</Dropdown.Item>
								)}
							</DropdownButton>
						</InputGroup>
					</div>
				</Col> 
			</Row>

			<Row>
	
			{state === 'public' ? (
			// 狀態為 'public' 時的渲染內容
			filteredItems.map((book, index) => (
				<Col xs={4} md={3}>
					<PersonalParticipate 
						key={index}
						book={book?.eId}
						title={book?.eventTitle} 
						image={convertImage(book?.eventImage) ?? '/image-not-found.jpg'} 
						targetDate={book?.time?.submitTime} 
						part={book?.totalChapterNum} 
						published={1}
						state={book?.isPublish}
						code={book?.eventKey}
					/>
				</Col>
			))
			) : (
			// 狀態不為 'public' 時的渲染內容
			state === 'privacy' &&
				filteredItems.map((book, index) => (
				<Col xs={4} md={3}>
					<PersonalParticipate 
						key={index}
						book={book?.eId}
						title={book?.eventTitle} 
						image={convertImage(book?.eventImage) ?? '/image-not-found.jpg'} 
						targetDate={book?.time?.submitTime} 
						part={book?.totalChapterNum} 
						published={0}
						state={book?.isPublish}
						code={book?.eventKey}
					/>
				</Col>
				))
			)}
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

export default BookPersonal;
