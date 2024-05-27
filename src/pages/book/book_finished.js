import { Suspense,useState } from 'react';
import Head from 'next/head';
import NavBar from '@/components/navbar';
import { Container, Row, Col } from 'react-bootstrap';
import {  Dropdown, DropdownButton,Form,FloatingLabel,InputGroup } from 'react-bootstrap';
import All_finished from '@/components/cards/all_finished';
import { useTranslation } from 'react-i18next';
import styles from '@/styles/book-brief.module.css';




function book_finished() {

  const books = [
    { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',viewer : "3223" },
    { title: '夏天的規則', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-2.jpg',viewer : "2887" },
    { title: '大野狼要小心', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example.jpg',viewer : "3033" },
    { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',viewer : "3223" },
    { title: '夏天的規則', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-2.jpg',viewer : "2887" },
    { title: '大野狼要小心', author: 'baxter', profile:'/profile-3.JPG', image: '/book-example.jpg',viewer : "3033" },
    { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',viewer : "3223" },
    { title: '夏天的規則', author: 'baxter', profile:'/profile-3.JPG', image: '/book-example-2.jpg',viewer : "2887" },
    { title: '大野狼要小心', author: 'baxter', profile:'/profile-3.JPG', image: '/book-example.jpg',viewer : "3033" },
  ];

  const [query, setQuery] = useState("");
  const [searchingtype , setsearchingtype] = useState('title');
 
  const filteredItems = books.filter((item) =>
    item[searchingtype] && item[searchingtype].toLowerCase().includes(query.toLowerCase())
  );

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
              <h2 class="text-2xl">All Publication</h2>
              <h2 class="text-4xl font-bold mb-4 text-red">所有出版刊物</h2>
            </div>
            {/* 搜尋過濾器 */}
            <div>
              <InputGroup >   
                <DropdownButton 
                title={
                  searchingtype === "title"
                  ? "書名"
                  : searchingtype === "author"
                    ? "作者"
                    : "代碼"
                }
                id="input-group-dropdown-1"
                >   
                <Dropdown.Item onClick={() => setsearchingtype("title")}>書名</Dropdown.Item>
                <Dropdown.Item onClick={() => setsearchingtype("author")}>作者</Dropdown.Item>
                </DropdownButton>

                <FloatingLabel
                    controlId="floatingInput"
                    //立即執行函數表達式 (IIFE):兩個(function)()
                    label={(() => {
                      switch (searchingtype) {
                        case "title":
                          return "以書名搜尋...";
                        case "author":
                          return "以作者搜尋...";
                        case "code":
                          return "以活動搜尋...";
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

              </InputGroup>
            </div>
          </Col>          
        </Row>

        <Row  xs={1} md={5} className="g-4" >
        <Suspense fallback={<h2>Loading...</h2>}>
          {filteredItems.map((book, index) => (
              < All_finished
                key={index} 
                title={book.title} 
                author={book.author} 
                profile={book.profile} 
                image={book.image} 
                viewer={book.viewer}
              />
            ))}
        </Suspense>

        </Row>
      </Container>
    </>
  )
}

export default book_finished

