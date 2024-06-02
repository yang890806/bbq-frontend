import Head from 'next/head';
import Image from 'next/image';
import NavBar from '@/components/navbar';
import Cards from '@/components/cards/cards_finished';
import Processing from '@/components/cards/cards_processing.js';

import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import styles from '@/styles/book-brief.module.css';
import { useState,useRef  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import {faAngleRight } from '@fortawesome/free-solid-svg-icons';
import {faAngleUp } from '@fortawesome/free-solid-svg-icons';

function home() {

    const books = {
        finished: [
          { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg', content:"Some quick example text to build on the card title and make up thebulk of the card's content.Some quick example text to build on the card title and make up the"},
          { title: '夏天的規則', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-2.jpg', content:"Some quick example text to build on the card title and make up thebulk of the card's content.Some quick example text to build on the card title and make up the" },
          { title: '大野狼要小心', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example.jpg', content:"Some quick example text to build on the card title and make up thebulk of the card's content.Some quick example text to build on the card title and make up the" },
          { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg', content:"Some quick example text to build on the card title and make up thebulk of the card's content.Some quick example text to build on the card title and make up the" },
          { title: '夏天的規則', author: 'baxter', profile:'/profile-3.JPG', image: '/book-example-2.jpg', content:"Some quick example text to build on the card title and make up thebulk of the card's content.Some quick example text to build on the card title and make up the" },
          { title: '大野狼要小心', author: 'baxter', profile:'/profile-3.JPG', image: '/book-example.jpg', content:"Some quick example text to build on the card title and make up thebulk of the card's content.Some quick example text to build on the card title and make up the" },
          { title: '長板坡', author: 'baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg', content:"Some quick example text to build on the card title and make up thebulk of the card's content.Some quick example text to build on the card title and make up the" },
          { title: '夏天的規則', author: 'baxter', profile:'/profile-3.JPG', image: '/book-example-2.jpg', content:"Some quick example text to build on the card title and make up thebulk of the card's content.Some quick example text to build on the card title and make up the" },
          { title: '大野狼要小心', author: 'baxter', profile:'/profile-3.JPG', image: '/book-example.jpg',  content:"Some quick example text to build on the card title and make up thebulk of the card's content.Some quick example text to build on the card title and make up the" },
        ],
        chain: [
          { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:1,part:1,content:"Some quick example text to build on the card title and make up thebulk of the card's content.Some quick example text to build on the card title and make up the" },
          { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:1,part:1,content:"Some quick example text to build on the card title and make up thebulk of the card's content.Some quick example text to build on the card title and make up the" },
          { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:1,part:1,content:"Some quick example text to build on the card title and make up thebulk of the card's content.Some quick example text to build on the card title and make up the" },
          { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:1,part:2,content:"Some quick example text to build on the card title and make up thebulk of the card's content.Some quick example text to build on the card title and make up the" },
          { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:1,part:2,content:"Some quick example text to build on the card title and make up thebulk of the card's content.Some quick example text to build on the card title and make up the" },
          { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:1,part:2,content:"Some quick example text to build on the card title and make up thebulk of the card's content.Some quick example text to build on the card title and make up the" },
          { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:1,part:2,content:"Some quick example text to build on the card title and make up thebulk of the card's content.Some quick example text to build on the card title and make up the" },
          { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',targetDate : '2024-07-25T00:00:00',State:1,part:3,content:"Some quick example text to build on the card title and make up thebulk of the card's content.Some quick example text to build on the card title and make up the" },
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
      
    //第一個滾動軸
    const { t } = useTranslation();
    const trackRef = useRef(null);
    const [currentIndex_1, setCurrentIndex_1] = useState(0);
    const [currentIndex_2, setCurrentIndex_2] = useState(0);
    const [currentIndex_3, setCurrentIndex_3] = useState(0);

    const handleRightClick = (state) => {
        if( state ==="finished" ){
            if (currentIndex_1 < books.finished.length- 4) {
                setCurrentIndex_1(prevIndex => prevIndex + 1);
            }
            else{
                setCurrentIndex_1(0);
            }
        }
        if( state ==="chain" ){
            if (currentIndex_2 < books.chain.length- 4) {
                setCurrentIndex_2(prevIndex => prevIndex + 1);
            }
            else{
                setCurrentIndex_2(0);
            }
        }
        if( state ==="vote" ){
            if (currentIndex_3 < books.vote.length- 4) {
                setCurrentIndex_3(prevIndex => prevIndex + 1);
            }
            else{
                setCurrentIndex_3(0);
            }
        }
    };
    

    const handleLeftClick = (state) => {
        if( state ==="finished" ){
            if (currentIndex_1 > 0) {
                setCurrentIndex_1(prevIndex => prevIndex - 1);
            }
            else {
                setCurrentIndex_1(books.finished.length- 4);
            }
        }
        if( state ==="chain" ){
            if (currentIndex_2 > 0) {
                setCurrentIndex_2(prevIndex => prevIndex - 1);
            }
            else {
                setCurrentIndex_2(books.finished.length- 4);
            }
        }

        if( state ==="vote" ){
            if (currentIndex_3 > 0) {
                setCurrentIndex_3(prevIndex => prevIndex - 1);
            }
            else {
                setCurrentIndex_3(books.finished.length- 4);
            }
        }

    };

    const itemWidth = trackRef.current ? trackRef.current.children[0].getBoundingClientRect().width : 0;


    
 
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
        {/* 缺少左右邊滑動按鈕 */}
        {/* 缺少文字框的設定 */}
    
        <Container>
            <Row className={styles.banner} >
                <Col className={styles.banner}>
                    <Image 
                    fluid
                    src="/banner_children.png" 
                    alt="Banner image placeholder" 
                    width={1200} // 圖片原始寬度
                    height={483}
                    />

                    <Button 
                        variant="outline-warning" 
                        className={`${styles.btn} `}   
                        onClick={() => window.location.href='/book/create'} 
                    >{ t('Create New Book +') }</Button>
            
                </Col>
            </Row>

            
            {/* <!-- Latest Publication Section --> */}
            <Row>
                <Col className="d-flex justify-content-between align-items-center"  >
                    <div>
                        <h2 class="text-xl mt-4">All Publication</h2>
                        <h2 class="text-3xl font-bold mb-2 text-red">最新出版！</h2>
                    </div>
                    <Button variant="outline-danger" className={`${styles.btn_outline_finish}  mt-5 fs-6`}   onClick={() => window.location.href='/book/book_processing?status=finished'} > {t( "Go to All Publication" )}</Button>
                </Col>
            </Row>

            <Row className={`${styles.carousel} mt-3`} >
                <Col xs="auto" >
                 <button className={`${styles.carousel_button} ${styles.left}`} onClick={() => handleLeftClick("finished")}>
                    <FontAwesomeIcon icon={faAngleLeft }/>
                 </button>
                </Col>
                <Col  className={`${styles.carousel_track_container}`}>
                    <Col 
                    className={styles.carousel_track} 
                    ref={trackRef} 
                    style={{ transform: `translateX(-${itemWidth * currentIndex_1}px)` }}
                    >
                        {books.finished.map((book, index) => (
                            <Col className={styles.carousel_item}>
                                <Cards
                                    key={index}
                                    title={book.title}
                                    author={book.author}
                                    profile={book.profile}
                                    image={book.image}
                                    content={book.content}
                                    
                                />
                            </Col>
                        ))} 
                    </Col>
                </Col>
                <Col xs="auto" >
                    <button className={`${styles.carousel_button} ${styles.right}`} onClick={() => handleRightClick("finished")}>
                        <FontAwesomeIcon icon={faAngleRight }/>
                    </button>
                </Col>
            </Row>

            




            {/* <!-- Hot Story Continuation Section --> */}
            <Row >
                <Col className="d-flex justify-content-between align-items-center">
                <div>
                    <h2 class="text-xl mt-4">Hot Story Continuation</h2>
                    <h2 class="text-3xl font-bold mb-2 text-green">熱門串串串！</h2>
                </div>
                <Button variant="outline-success" className={`${styles.btn_outline_processing} mt-5  fs-6 `}   onClick={() => window.location.href=`/book/book_processing?status=chain`}>{t( "Go to All Activity", { context: 'chain' })}</Button>
                </Col>
            </Row>


            {/* <!-- 書本簡介的傳送軸 --> */}
            <Row className={`${styles.carousel} mt-3`} >
                <Col xs="auto" >
                 <button className={`${styles.carousel_button} ${styles.left}`} onClick={() => handleLeftClick("chain")}>
                    <FontAwesomeIcon icon={faAngleLeft }/>
                 </button>
                </Col>
                <Col  className={`${styles.carousel_track_container}`}>
                    <Col 
                    className={styles.carousel_track} 
                    ref={trackRef} 
                    style={{ transform: `translateX(-${itemWidth * currentIndex_2}px)` }}
                    >
                        {books.chain.map((book, index) => (
                            <Col className={styles.carousel_item}>
                                <Processing
                                    key={index}
                                    title={book.title}
                                    Stage = {false}
                                    image={book.image}
                                    content={book.content}
                                    targetDate={book.targetDate}
                                />
                            </Col>
                        ))} 
                    </Col>
                </Col>
                <Col xs="auto" >
                    <button className={`${styles.carousel_button} ${styles.right}`} onClick={() => handleRightClick("chain")}>
                        <FontAwesomeIcon icon={faAngleRight }/>
                    </button>
                </Col>
            </Row>
          


            {/* <!-- Voting Section --> */}
            <Row >
                <Col className="d-flex justify-content-between align-items-center">
                    <div>
                        <h2 class="text-xl mt-4">All Publication</h2>
                        <h2 class="text-3xl font-bold mb-2 text-green">我要投票！</h2>

                    </div>
                <Button variant="outline-success" className={`${styles.btn_outline_processing}  mt-5 fs-6`}   onClick={() => window.location.href=`/book/book_processing?status=vote`}>{t( "Go to All Activity", { context: 'voting' } )}</Button>
                </Col>                
            </Row>

              {/* <!-- 書本簡介的傳送軸 --> */}
              <Row className={`${styles.carousel} mt-3`} >
                <Col xs="auto" >
                 <button className={`${styles.carousel_button} ${styles.left}`} onClick={() => handleLeftClick("vote")}>
                    <FontAwesomeIcon icon={faAngleLeft }/>
                 </button>
                </Col>
                <Col  className={`${styles.carousel_track_container}`}>
                    <Col 
                    className={styles.carousel_track} 
                    ref={trackRef} 
                    style={{ transform: `translateX(-${itemWidth * currentIndex_3}px)` }}
                    >
                        {books.chain.map((book, index) => (
                            <Col className={styles.carousel_item}>
                                <Processing
                                    key={index}
                                    title={book.title}
                                    Stage = {true}
                                    image={book.image}
                                    content={book.content}
                                    targetDate={book.targetDate}
                                />
                            </Col>
                        ))} 
                    </Col>
                </Col>
                <Col xs="auto" >
                    <button className={`${styles.carousel_button} ${styles.right}`} onClick={() => handleRightClick("vote")}>
                        <FontAwesomeIcon icon={faAngleRight }/>
                    </button>
                </Col>
            </Row>

           
            


            {/* <!-- 回到最上部分 --> */}
            <Row>
                <Col class="text-center mt-5">
                    <a href="#"><FontAwesomeIcon icon={ faAngleUp } className="mr-2 mt-1" /> </a>
                </Col>
                <Col class="text-center mb-8">
                 <a href="#">回到上部</a>
                </Col>
            </Row>

        </Container>
      
    </>
  )
}

export default home
