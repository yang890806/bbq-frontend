import Head from 'next/head';
import NavBar from '@/components/navbar';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useEffect,useState } from 'react';
import { Container, Row, Col, ButtonGroup, ToggleButton  } from 'react-bootstrap';
import {  Dropdown, DropdownButton,Form,FloatingLabel,InputGroup } from 'react-bootstrap';
import All_processing from '@/components/cards/all_processing';
import All_finished from '@/components/cards/all_finished';
import axios from '@/utils/axios';
import convertImage from '@/components/convertImage';
import styles from '@/styles/book-brief.module.css';
// 需要補上css style使用，對於bootstrap的基本code調整
// 需要補上css style使用，對於bootstrap的基本code調整

// // 定義篩選函數
// const filterBooks = (books) => {
//   // 篩選已發布的書本
//   books.finished = books.filter(book => book.isPublish === 1);
//   // 篩選未發布的書本
//   const unpublishedBooks = books.filter(book => book.isPublish === 0);
//   console.log("已發布的書本:", publishedBooks);  // 輸出已發布的書本
//   console.log("未發布的書本:", unpublishedBooks);  // 輸出未發布的書本
//   return { publishedBooks, unpublishedBooks };
// };


function BookProcessing() {

	const [books, setBooks] = useState({
		finished: [],
		chain: [],
		vote: [],
	});

	const header={

		chain: {
			ch:"所有接龍",
			en:"All Solitaire"
		},
		
		vote: {
			ch:"所有投票",
			en:"All Votes"
		},

		finished: {
			ch:"所有出版刊物",
			en:"All Publication"
		},
	};

	const [bookInfo1, setBookInfo1] = useState([]);
	const [bookInfo2, setBookInfo2] = useState([]);
	const [bookInfo3, setBookInfo3] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);


	const fetchBook = async() => {
		try {
			// 分別發送三個不同的請求
			const response1 = await axios.get('/allEvent/1', { params: { eventStatus: 1 } });
			const response2 = await axios.get('/allEvent/1', { params: { eventStatus: 2 } });
			const response3 = await axios.get('/allEvent/1', { params: { eventStatus: 3 } });

			// 將回應資料分別賦值給不同的狀態
			setBookInfo1(response1.data);
			setBookInfo2(response2.data);
			setBookInfo3(response3.data);

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
			finished: bookInfo1,
			chain: bookInfo2,
			vote: bookInfo3,
		  }));
		}
	  }, [dataLoaded, bookInfo1, bookInfo2, bookInfo3]);

	  console.log(books.vote);
	

	const { t } = useTranslation();
	const [activeTab, setActiveTab] =useState('finished');
	const [query, setQuery] = useState("");
	const [searchingtype , setsearchingtype] = useState('eventTitle');


	const router = useRouter();
	const { status } = router.query;

	useEffect(() => {
		if (status) {
			setActiveTab(status);
		}
	}, [status]);

		const filteredItems =  books[activeTab].filter((item) =>
		  item[searchingtype] && item[searchingtype].toLowerCase().includes(query.toLowerCase()))
	
	console.log(filteredItems);
	
	const renderedItems = filteredItems.map((book, index) => {
		if (activeTab === "finished") {
		  return (
			<All_finished
			  key={index}
			  title={book.eventTitle}
			  author={book.creator.username}
			  profile={convertImage(book.avatar)}
			  image={convertImage(book.eventImage)}
			  viewer={book.viewCount}
			/>
		  );
		} else if (activeTab === "chain") {
		  return (
			<All_processing
			  key={index}
			  title={book.eventTitle}
			  author={book.creator.username}
			  profile={convertImage(book.avatar)}
			  image={convertImage(book.eventImage)}
			  targetDate={book.time.submitTime}
			  State={0}
			  part={book.totalChapterNum}
			/>
		  );
		} else if (activeTab === "vote") {
			return (
				<All_processing
					key={index}
					title={book.eventTitle}
					author={book.creator.username}
					profile={convertImage(book.avatar)}
					image={convertImage(book.eventImage)}
					targetDate={book.time.submitTime}
					State={1}
					part={book.totalChapterNum}
				/>
			);
		}
	  });



	// const renderedItems = activeTab === "finished"
	// ? books.finished.map((book, index) => (
	// 		<All_finished
	// 			key={index}
	// 			title={book.eventTitle}
	// 			author={book.author}
	// 			profile={book.profile}
	// 			image={book.image}
	// 			viewer={book.viewCount}
	// 		/>
	// 	))

	// : books.chain.map((book, index) => (
	// 		<All_processing
	// 			key={index}
	// 			title={book.title}
	// 			author={book.author}
	// 			profile={book.profile}
	// 			image={book.image}
	// 			targetDate={book.targetDate}
	// 			State={book.State}
	// 			part={book.part}
	// 		/>
	// 	));
	
	
	// const renderedItems = dataLoaded ? (
	// 	activeTab === "finished"
	// 	? 
	// 	  books[activeTab].filter((book) =>
	// 		book[searchingtype] && book[searchingtype].toLowerCase().includes(query.toLowerCase())
	// 	  ).map((book, index) => (
	// 		<All_finished
	// 		  key={index}
	// 		  title={book.eventTitle}
	// 		  author={book.creator.username}
	// 		  profile={book.profile}
	// 		  image={book.image}
	// 		  viewer={book.viewCount}
	// 		/>
	// 	  ))
	// 	: books[activeTab].filter((book) =>
	// 		book[searchingtype] && book[searchingtype].toLowerCase().includes(query.toLowerCase())
	// 	  ).map((book, index) => (
	// 		<All_processing
	// 		  key={index}
	// 		  title={book.title}
	// 		  author={book.author}
	// 		  profile={book.profile}
	// 		  image={book.image}
	// 		  targetDate={book.targetDate}
	// 		  State={book.State}
	// 		  part={book.part}
	// 		/>
	// 	  ))
	//   ) : <div>Loading...</div>;
	  



	
	// const filteredItems = dataLoaded ? (
	// 	books[activeTab].filter((item) =>
	// 	  item[searchingtype] && item[searchingtype].toLowerCase().includes(query.toLowerCase())
	// 	)
	// ) : [];


	// const renderedItems = dataLoaded ? (
	// 	activeTab === "finished"
	// 	? 
	// 		filteredItems.map((book, index) => (
	// 		<All_finished
	// 			key={index}
	// 			title={book.eventTitle}
	// 			author={book.author}
	// 			profile={book.profile}
	// 			image={book.image}
	// 			viewer={book.viewCount}
	// 		/>
	// 	))
	// 	: filteredItems.map((book, index) => (
	// 		<All_processing
	// 			key={index}
	// 			title={book.title}
	// 			author={book.author}
	// 			profile={book.profile}
	// 			image={book.image}
	// 			targetDate={book.targetDate}
	// 			State={book.State}
	// 			part={book.part}
	// 		/>
	// 	))
	// ) : <div>Loading...</div>;

	// const renderedItems = activeTab === "finished"
	// ? filteredItems.map((book, index) => (
	// 		<All_finished
	// 			key={index}
	// 			title={book.eventTitle}
	// 			author={book.author}
	// 			profile={book.profile}
	// 			image={book.image}
	// 			viewer={book.viewCount}
	// 		/>
	// 	))
	// : filteredItems.map((book, index) => (
	// 		<All_processing
	// 			key={index}
	// 			title={book.title}
	// 			author={book.author}
	// 			profile={book.profile}
	// 			image={book.image}
	// 			targetDate={book.targetDate}
	// 			State={book.State}
	// 			part={book.part}
	// 		/>
	// 	));



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
                <Row >
                    <Col className="d-flex justify-content-between align-items-center mt-5"  >
                        <div>
                            <h2 className="text-2xl">{header[activeTab].en}</h2>
                            <h2 className={`text-4xl font-bold mb-4 ${activeTab === "finished" ? "text-red" : "text-green"}`}>{header[activeTab].ch}</h2>
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
                                    checked={activeTab ==="finished"}
                                    onChange={() => setActiveTab("finished")}
                                >
                                    {t( "Publication" )}
                                </ToggleButton>

                                <ToggleButton
                                    className='mr-3 rounded-3'
                                    key="2"
                                    id="radio-1"
                                    type="radio"
                                    variant="outline-secondary"
                                    name="radio"
                                    value="2"
                                    checked={activeTab === "chain"}
                                    onChange={() => setActiveTab("chain")}
                                >
                                    {t( "Solitaire" )}
                                </ToggleButton>

                                <ToggleButton
                                    className='mr-3 rounded-3'
                                    key="3"
                                    id="radio-2"
                                    type="radio"
                                    variant="outline-secondary"
                                    name="radio"
                                    value="3"
                                    checked={activeTab ==="vote"}
                                    onChange={() => setActiveTab("vote")}
                                >
                                {t( "Vote" )}
                                </ToggleButton>

                            </ButtonGroup>
                        </div>


                        <div className='ml-1'>
                            <InputGroup >   
                            
                                <FloatingLabel
                                        controlId="floatingInput"
                                        //立即執行函數表達式 (IIFE):兩個(function)()
                                        label={(() => {
                                            switch (searchingtype) {
                                                case "eventTitle":
                                                    return `${t( "Search by Book Title..." )}`;
                                                case "creator.username":
                                                    return`${t( "Search by Authors..." )}`;
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
                                        : searchingtype === "creator.username"
                                        ? `${t( "Authors" )}`
                                        : "代碼"
                                    }
                                    id="input-group-dropdown-1"
                                    >   
                                    <Dropdown.Item onClick={() => setsearchingtype("eventTitle")}>書名</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setsearchingtype("creator.username")}>作者</Dropdown.Item>
                                </DropdownButton>
                            </InputGroup>
                        </div>


                    </Col>
                </Row>

            <Row xs={1} md={5} className="g-4">
                    
            	{renderedItems}

            </Row>
        </Container>
		</>
	)
}

export default BookProcessing;
