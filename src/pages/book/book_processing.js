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


function book_processing () {

  const test = {
    finished: [], // 已完成的書籍
    chain: [],    // 連載中的書籍
    vote: [],     // 投票中的書籍
  };  

  const [bookInfo, setBookInfo] = useState([]);
  const fetchBook = async() => {
    await axios.get(`/allEvent/1`, {}, {})
    .then((res) => {

      const events = Object.values(res).filter(item => typeof item === 'object' && item.eId);    
      setBookInfo(events);
  
    })
    .catch((error) => {
      console.log('Fetch book error:', error);
    });
  
	};

	useEffect(() => {
		fetchBook();
	}, []);

  test.finished = bookInfo.filter(book => book.isPublish === 1);
  test.chain =bookInfo.filter(book => book.isPublish === 0);
  console.log(test.finished);



  const { t } = useTranslation();
  const [activeTab, setActiveTab] =useState('finished');
  const [query, setQuery] = useState("");
  const [searchingtype , setsearchingtype] = useState('title');


  const router = useRouter();
	const { status } = router.query;

  useEffect(() => {
    if (status) {
      setActiveTab(status);
    }
  }, [status]);


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

 

  const books = {
    finished: [
      { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',viewer : "3223" },
      { title: '夏天的規則', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-2.jpg',viewer : "2887" },
      { title: '大野狼要小心', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example.jpg',viewer : "3033" },
      { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',viewer : "3223" },
      { title: '夏天的規則', author: 'baxter', profile:'/profile-3.JPG', image: '/book-example-2.jpg',viewer : "2887" },
      { title: '大野狼要小心', author: 'baxter', profile:'/profile-3.JPG', image: '/book-example.jpg',viewer : "3033" },
      { title: '長板坡', author: 'baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',viewer : "3223" },
      { title: '夏天的規則', author: 'baxter', profile:'/profile-3.JPG', image: '/book-example-2.jpg',viewer : "2887" },
      { title: '大野狼要小心', author: 'baxter', profile:'/profile-3.JPG', image: '/book-example.jpg',viewer : "3033" },
    ],
    chain: [
      { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:1,part:1 },
      { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:1,part:1 },
      { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:1,part:1 },
      { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:1,part:2 },
      { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:1,part:2 },
      { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:1,part:2 },
      { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:1,part:2 },
      { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:1,part:3 },
    ],
    vote: [
      { title: '哈囉', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:0,part:3},
      { title: '哈囉', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:0,part:3 },
      { title: '哈囉', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:0,part:3 },
      { title: '哈囉', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:0,part:3 },
      { title: '哈囉', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:0,part:3 },
      { title: '哈囉', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:0,part:3 },
      { title: '哈囉', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:0,part:3 },
    ]
  
  };
  
  const filteredItems = books[activeTab].filter((item) =>
    item[searchingtype] && item[searchingtype].toLowerCase().includes(query.toLowerCase())
  );


  const renderedItems = activeTab === "finished"
  ? filteredItems.map((book, index) => (
      <All_finished
        key={index}
        title={book.title}
        author={book.author}
        profile={book.profile}
        image={book.image}
        viewer={book.viewer}
      />
    ))
  : filteredItems.map((book, index) => (
      <All_processing
        key={index}
        title={book.title}
        author={book.author}
        profile={book.profile}
        image={book.image}
        targetDate={book.targetDate}
        State={book.State}
        part={book.part}
      />
    ));



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
                <h2 class="text-2xl">{header[activeTab].en}</h2>
                <h2 class={`text-4xl font-bold mb-4 ${activeTab === "finished" ? "text-red" : "text-green"}`}>{header[activeTab].ch}</h2>
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
                          case "title":
                            return `${t( "Search by Book Title..." )}`;
                          case "author":
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
                      searchingtype === "title"
                      ? `${t( "Book Title" )}`
                      : searchingtype === "author"
                      ? `${t( "Authors" )}`
                      : "代碼"
                    }
                    id="input-group-dropdown-1"
                    >   
                    <Dropdown.Item onClick={() => setsearchingtype("title")}>書名</Dropdown.Item>
                    <Dropdown.Item onClick={() => setsearchingtype("author")}>作者</Dropdown.Item>
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

export default book_processing
