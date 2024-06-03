import Head from 'next/head';
import Image from 'next/image';
import axios from '@/utils/axios';
import { useState,useRef,useEffect  } from 'react';
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import NavBar from '@/components/navbar';
import Cards from '@/components/cards/cards_finished';
import Processing from '@/components/cards/cards_processing.js';
import styles from '@/styles/book-brief.module.css';
import convertImage from '@/components/convertImage';


function Home() {

    const [books, setBooks] = useState({
		finished: [],
		chain: [],
		vote: [],
	});

    const trackRef = useRef(null);
	const [bookInfo1, setBookInfo1] = useState([]);
	const [bookInfo2, setBookInfo2] = useState([]);
	const [bookInfo3, setBookInfo3] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);
    const [itemWidth, setItemWidth] = useState(0);


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

        const firstChild = trackRef.current.children[0];
        if (firstChild) {
            const width = firstChild.getBoundingClientRect().width;
            setItemWidth(width);
        }


    }
    }, [dataLoaded, bookInfo1, bookInfo2, bookInfo3]);

   




    //第一個滾動軸
    const { t } = useTranslation();
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

    console.log(books.vote)

    

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
                    <Button variant="outline-danger" className={`${styles.btn_outline_finish}  mt-5 fs-6`}   onClick={() => window.location.href='/book/processing?status=finished'} > {t( "Go to All Publication" )}</Button>
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
                                    key={index || 'undefined'}
                                    title={book.eventTitle || 'undefined'}
                                    author={book.creator.username || 'undefined'}
                                    //avatar為空數值，需要更改
                                    //profile={convertImage(books.creator.avatar}
                                    image={convertImage(book.eventImage) || 'undefined'}
                                    content={book.eventIntro || 'undefined'}
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
                <Button variant="outline-success" className={`${styles.btn_outline_processing} mt-5  fs-6 `}   onClick={() => window.location.href=`/book/processing?status=chain`}>{t( "Go to All Activity", { context: 'chain' })}</Button>
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
                                    key={index|| 'undefined'}
                                    title={book.eventTitle || 'undefined'}
                                    Stage = {false}
                                    image={convertImage(book.eventImage) || 'undefined'}
                                    content={book.eventIntro || 'undefined'}
                                    targetDate={book.time.submitTime || 'undefined'}
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
                <Button variant="outline-success" className={`${styles.btn_outline_processing}  mt-5 fs-6`}   onClick={() => window.location.href=`/book/processing?status=vote`}>{t( "Go to All Activity", { context: 'voting' } )}</Button>
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
                                    key={index|| 'undefined'}
                                    title={book.eventTitle|| 'undefined'}
                                    Stage = {true}
                                    image={convertImage(book.eventImage)|| 'undefined'}
                                    content={book.eventIntro|| 'undefined'}
                                    targetDate={book.time.submitTime|| 'undefined'}
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

export default Home;
