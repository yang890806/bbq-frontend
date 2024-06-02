import {useState } from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import NavBar from '@/components/navbar';
import { Container, Row, Col, ButtonGroup, ToggleButton  } from 'react-bootstrap';
import { Dropdown, DropdownButton,Form,FloatingLabel,InputGroup } from 'react-bootstrap';
import Personal_participate from '@/components/cards/personal_participate';





function book_finished() {

  const books ={ 
    
    public:[
    { title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',part:1, published:1,state:1},
    { title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-06-24T00:00:00',part:2, published:1,state:1},
    { title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-06-20T00:00:00',part:2, published:1,state:1},
    { title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',part:1, published:1,state:0},
    { title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-08-20T00:00:00',part:2, published:1,state:0},
    { title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-08-15T00:00:00',part:3, published:1,state:0},
    { title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-08-25T00:00:00',part:4, published:1,state:0},
    ],

    privacy:[
      { title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',part:5, published:0,state:1,code:"47232"},
      { title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-06-24T00:00:00',part:5, published:0,state:1,code:"89373"},
      { title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-06-20T00:00:00',part:4, published:0,state:1,code:"56422"},
      { title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',part:2, published:0,state:0,code:"99842"},
      { title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-08-20T00:00:00',part:2, published:0,state:0,code:"12646"},
      { title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-08-15T00:00:00',part:3, published:0,state:0,code:"22434"},
      { title: '長板坡', author: 'james baxter', image: '/book-example-3.jpg',targetDate : '2024-08-25T00:00:00',part:1, published:0,state:0,code:"10923"},
    ]

  }
  ;

  const { t } = useTranslation();
  const [activeTab, setActiveTab] =useState(0);
  const [state, setstate] =useState('public');
  const [query, setQuery] = useState("");
  const [searchingtype , setsearchingtype] = useState('title');
 

  const filteredItems = books[state].filter((item) => {
    if (activeTab === "all") {
      return item[searchingtype] && item[searchingtype].toLowerCase().includes(query.toLowerCase());
    } else {
      return item.state === activeTab && item[searchingtype] && item[searchingtype].toLowerCase().includes(query.toLowerCase());
    }
  });

  const handleChange = (event) => {
    const value = event.target.value;
    if (value === "1") {
      setstate("public");
      setsearchingtype("title");
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
              <h2 class="text-2xl">All activity</h2>
              <h2 class="text-4xl font-bold mb-4">我的活動</h2>
  
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
                        case "title":
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
                      searchingtype === "title"
                      ? `${t( "Book Title" )}`
                      : searchingtype === "author"
                      ? `${t( "Authors" )}`
                      : "代碼"
                    }
                    id="input-group-dropdown-1"
                    >   
                    
                    <Dropdown.Item onClick={() => setsearchingtype("title")}>{t( "Book Title" )}</Dropdown.Item>
                    {state === "privacy" && (
                      <Dropdown.Item onClick={() => setsearchingtype("code")}>{t( "Code" )}</Dropdown.Item>
                    )}
                    
                  </DropdownButton>







                </InputGroup>
              </div>
            </Col> 

        </Row>

        <Row  xs={1} md={5} className="g-4" >
        
        
        {filteredItems.map((book, index) => (
            < Personal_participate 
              key={index} 
              title={book.title} 
              image={book.image} 
              targetDate={book.targetDate} 
              part={book.part} 
              published={book.published}
              state={book.state}
              code={book.code}
            />
          ))}
      

        </Row>
      </Container>
    </>
  )
}

export default book_finished

