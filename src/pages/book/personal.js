import Head from 'next/head';
import { useEffect,useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, ButtonGroup, ToggleButton  } from 'react-bootstrap';
import { Dropdown, DropdownButton, Form, FloatingLabel, InputGroup } from 'react-bootstrap';
import NavBar from '@/components/navbar';
import axios from '@/utils/axios';
import convertImage from '@/components/convertImage';
import Personal_participate from '@/components/cards/personal_participate';

function BookPersonal() {



	const [books, setBooks] = useState({
		public:[],
		privacy:[]
	});


	const [bookInfo1, setBookInfo1] = useState([]);
	const [bookInfo2, setBookInfo2] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);
	

	const fetchBook = async() => {
		try {
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

	

	  console.log(books.public)
	  console.log(books.privacy)



	// const books ={ 
	// 	public:[
	// 		{ title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',part:1, published:1,state:1},
	// 		{ title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-06-24T00:00:00',part:2, published:1,state:1},
	// 		{ title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-06-20T00:00:00',part:2, published:1,state:1},
	// 		{ title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',part:1, published:1,state:0},
	// 		{ title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-08-20T00:00:00',part:2, published:1,state:0},
	// 		{ title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-08-15T00:00:00',part:3, published:1,state:0},
	// 		{ title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-08-25T00:00:00',part:4, published:1,state:0},
	// 	],

	// 	privacy:[
	// 		{ title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',part:5, published:0,state:1,code:"47232"},
	// 		{ title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-06-24T00:00:00',part:5, published:0,state:1,code:"89373"},
	// 		{ title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-06-20T00:00:00',part:4, published:0,state:1,code:"56422"},
	// 		{ title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',part:2, published:0,state:0,code:"99842"},
	// 		{ title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-08-20T00:00:00',part:2, published:0,state:0,code:"12646"},
	// 		{ title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-08-15T00:00:00',part:3, published:0,state:0,code:"22434"},
	// 		{ title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-08-25T00:00:00',part:1, published:0,state:0,code:"10923"},
	// 	]
	// };




	const { t } = useTranslation();
	const [activeTab, setActiveTab] =useState(0);
	const [state, setstate] =useState('public');
	const [query, setQuery] = useState("");
	const [searchingtype , setsearchingtype] = useState('eventTitle');
 
	const filteredItems = books[state].filter((item) => {
		if (activeTab === "all") {
			return item[searchingtype] && item[searchingtype].toLowerCase().includes(query.toLowerCase());
		} else {
			return item.isPublish === activeTab && item[searchingtype] && item[searchingtype].toLowerCase().includes(query.toLowerCase());
		}
	});



	const handleChange = (event) => {
		const value = event.target.value;
		if (value === "1") {
			setstate("public");
			setsearchingtype("eventTitle");
		} else if (value === "2") {
			setstate("privacy");
		}
	};

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
			{/* <!-- Latest Publication Section --> */}
			<Row>
				<Col className="d-flex justify-content-between align-items-center  mt-5" >
					{/* Title 顯示 */}
					<div>
						<h2 className="text-2xl">All activity</h2>
						<h2 className="text-4xl font-bold mb-4">我的活動</h2>

					</div>
					<div>
					<Form.Select className='ml-6 fs-7 mt-2' onChange={handleChange}>
						<option value="1" >{t( "Public" )}</option>
						<option value="2" >{t( "Private" )}</option>
					</Form.Select>
					</div>      
					
					<div className=' ml-auto'>
						<ButtonGroup >
							<ToggleButton
								className='mr-3 rounded-3'
								key="1"
								id="radio-0"
								type="radio"
								variant="outline-secondary"
								name="radio"
								value="1"
								checked={activeTab === "all"}
								onChange={() => setActiveTab("all")}
							>
							{t('Show All')}
							</ToggleButton>
							<ToggleButton
								className='mr-3 rounded-3'
								key="1"
								id="radio-1"
								type="radio"
								variant="outline-secondary"
								name="radio"
								value="2"
								checked={activeTab ===0}
								onChange={() => setActiveTab(0)}
							>
							{t('Create')}
							</ToggleButton>
							<ToggleButton
								className='mr-3 rounded-3'
								key="1"
								id="radio-2"
								type="radio"
								variant="outline-secondary"
								name="radio"
								value="3"
								checked={activeTab ===1}
								onChange={() => setActiveTab(1)}
							>
							{t('Participate')}
							</ToggleButton>
						</ButtonGroup> 
					</div>

						<div className='ml-3'>
							<InputGroup >   
								<FloatingLabel
									controlId="floatingInput"
									//立即執行函數表達式 (IIFE):兩個(function)()
									label={(() => {
										switch (searchingtype) {
											case "eventTitle":
												return `${t( "Search by Book Title..." )}`;
											case "author":
												return `${t( "Search by Authors..." )}`;
											case "code":
												return `${t( "Search by Activity Code..." )}`;
											default:
												return `以${searchingtype}搜尋...`;
										}
									})()}
								>
								<Form.Control
									placeholder=""  
									onChange={(e)=>{setQuery(e.target.value)}}  
								/>
								</FloatingLabel>
								<DropdownButton 
									title={
										searchingtype === "eventTitle"
										? `${t( "Book Title" )}`
										: searchingtype === "author"
										? `${t( "Authors" )}`
										: `${t( "Code" )}`
									}
									id="input-group-dropdown-1"
									>   
									
									<Dropdown.Item onClick={() => setsearchingtype("eventTitle")}>{t( "Book Title" )}</Dropdown.Item>
									{state === "privacy" && (
										<Dropdown.Item onClick={() => setsearchingtype("eventKey")}>{t("Code" )}</Dropdown.Item>
									)}
									
								</DropdownButton>


							</InputGroup>
						</div>
					</Col> 

			</Row>

			<Row  xs={1} md={5} className="g-4" >
	
			{state === 'public' ? (
			// 狀態為 'public' 時的渲染內容
			filteredItems.map((book, index) => (
				<Personal_participate 
					key={index}
					title={book.eventTitle} 
					image={convertImage(book.eventImage)} 
					// targetDate={book.time.submitTime} 
					part={book.totalChapterNum} 
					published={1}
					state={book.isPublish}
					code={book.eventKey}
				/>
			))
			) : (
			// 狀態不為 'public' 時的渲染內容
			state === 'privacy' &&
				filteredItems.map((book, index) => (
				<Personal_participate 
					key={index}
					title={book.eventTitle} 
					image={convertImage(book.eventImage)} 
					// targetDate={book.time.submitTime} 
					part={book.totalChapterNum} 
					published={0}
					state={book.isPublish}
					code={book.eventKey}
				/>
				))
			)}

			</Row>
		</Container>
		</>
	)
}

export default BookPersonal;

