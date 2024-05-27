import Head from 'next/head';
import Image from 'next/image';
import getConfig from 'next/config';
////////////////////////////////////
import NavBar from '@/components/navbar';
import Cards from '@/components/cards/cards_finished';
import Processing from '@/components/cards/cards_processing.js';
////////////////////////////////////
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
///////////////////////////////////////
import styles from '@/styles/book-brief.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleUp } from '@fortawesome/free-solid-svg-icons';

function home() {
    
    //第一個滾動軸
    const { t } = useTranslation();

    //第一個滾動軸
    const [index1, setIndex1] = useState(0);
    //第二個滾動軸
    const [index2, setIndex2] = useState(0);
    //第三個滾動軸
    const [index3, setIndex3] = useState(0);

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
            <Row >
                <Col className="d-flex justify-content-between align-items-center"  >
                    <div>
                        <h2 class="text-2xl mt-5">All Publication</h2>
                        <h2 class="text-4xl font-bold mb-4 text-red">最新出版！</h2>
                    </div>
                    <Button variant="outline-danger" className={`${styles.btn_outline_finish}  mt-5 fs-5`}   onClick={() => window.location.href='/book/book_processing'} >所有刊物</Button>
                </Col>
            </Row>

            {/* <!-- 書本簡介的傳送軸 --> */}
            <Carousel 
            
                activeIndex={index1} 
                onSelect={(selectedIndex) => setIndex1(selectedIndex)}
                variant="dark" 
                >
                {/* <!-- 第一篇簡介書本 --> */}
                <Carousel.Item interval={10000} >
                    <Row xs={1} md={3} className="g-4" >
                        <Col >
                            <Cards 
                            title = "夏天的規則"
                            author = "james baxter"
                            profile = "/profile-3.JPG"
                            image="/book-example-2.jpg"
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content.Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                            />    
                        </Col>
                        <Col>
                            <Cards 
                            title = "夏天的規則"
                            author = "james baxter"
                            profile = "/profile-2.jpeg"
                            image="/book-example-2.jpg"
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content.Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                    
                            
                            />    
                        </Col>
                        <Col>
                            <Cards 
                            title = "夏天的規則"
                            author = "james baxter"
                            profile = "/profile-1.JPG"
                            image="/book-example-2.jpg"
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content.Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                            />    
                        </Col>
                    </Row>
                </Carousel.Item>

                {/* <!-- 第二篇簡介書本 --> */}
                <Carousel.Item interval={10000}  >
                    <Row xs={1} md={3} className="g-4" >
                        <Col >
                            <Cards 
                            title = "大野狼才要小心"
                            author = "james baxter"
                            profile = "/profile-3.JPG"
                            image="/book-example.jpg"
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                            />    
                        </Col>
                        <Col>
                            <Cards 
                            title = "大野狼才要小心"
                            author = "james baxter"
                            profile = "/profile-2.jpeg"
                            image="/book-example.jpg"
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                    
                            
                            />    
                        </Col>
                        <Col>
                            <Cards 
                            title = "大野狼才要小心"
                            author = "james baxter"
                            profile = "/profile-1.JPG"
                            image="/book-example.jpg"
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's conten. Some quick example text to build on the card title and make up the
                            bulk of the card's contenSome quick example text to build on the card title and make up the
                            bulk of the card's contenSome quick example text to build on the card title and make up the
                            bulk of the card's contenSome quick example text to build on the card title and make up the
                            bulk of the card's conten"
                            />    
                        </Col>
                    </Row>
                </Carousel.Item>
                 
                {/* <!-- 第三篇簡介書本 --> */}
                <Carousel.Item interval={10000}  >
                    <Row xs={1} md={3} className="g-4" >
                        <Col >
                            <Cards 
                            title = "長板坡"
                            author = "james baxter"
                            profile = "/profile-3.JPG"
                            image="/book-example-3.jpg"
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                
                            />    
                        </Col>
                        <Col>
                            <Cards 
                            title = "長板坡"
                            author = "james baxter"
                            profile = "/profile-2.jpeg"
                            image="/book-example-3.jpg"
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                    
                            
                            />    
                        </Col>
                        <Col>
                            <Cards 
                            title = "長板坡"
                            author = "james baxter"
                            profile = "/profile-1.JPG"
                            image="/book-example-3.jpg"
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's conten"
                            />    
                        </Col>
                    </Row>
                
                </Carousel.Item>
            </Carousel>




            {/* <!-- Hot Story Continuation Section --> */}
            <Row >
                <Col className="d-flex justify-content-between align-items-center">
                    
                <div>
                    <h2 class="text-xl mt-5">Hot Story Continuation</h2>
                    <h2 class="text-4xl font-bold mb-4 text-green">熱門串串串！</h2>
                </div>
                <Button variant="outline-success" className={`${styles.btn_outline_processing} mt-5  fs-5 `}   onClick={() => window.location.href='/book/book_processing'}>所有接龍</Button>
                
            
                </Col>
            </Row>
             {/* <!-- 書本簡介的傳送軸 --> */}
             <Carousel 
                
                activeIndex={index2} 
                onSelect={(selectedIndex) => setIndex2(selectedIndex)}
                variant="dark" 
                
                >
                {/* <!-- 第一篇簡介書本 --> */}
                <Carousel.Item interval={10000} >
                    <Row xs={1} md={3} className="g-4" >
                        <Col >
                            <Processing 
                            title = "夏天的規則"
                            Stage = {false}
                            image="/book-example-2.jpg"
                            targetDate = '2024-05-25T00:00:00'
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content.Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                
                            />    
                        </Col>
                        <Col>
                            <Processing 
                            title = "夏天的規則"
                            Stage = {false}
                            image="/book-example-2.jpg"
                            targetDate = '2024-05-24T12:00:00'
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content.Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                    
                            
                            />    
                        </Col>
                        <Col>
                            <Processing 
                            title = "夏天的規則"
                            Stage = {false}
                            image="/book-example-2.jpg"
                            targetDate = '2024-05-23T12:00:00'
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content.Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                            />    
                        </Col>
                    </Row>
                </Carousel.Item>

                {/* <!-- 第二篇簡介書本 --> */}
                <Carousel.Item interval={10000}  >
                    <Row xs={1} md={3} className="g-4" >
                        <Col >
                            <Processing 
                            title = "大野狼才要小心"
                            Stage = {false}
                            image="/book-example.jpg"
                            targetDate = '2024-05-23T12:00:00'
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                            />    
                        </Col>
                        <Col>
                            <Processing 
                            title = "大野狼才要小心"
                            Stage = {false}
                            image="/book-example.jpg"
                            targetDate = '2024-05-26T12:00:00'
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                    
                            
                            />    
                        </Col>
                        <Col>
                            <Processing 
                            title = "大野狼才要小心"
                            Stage = {false}
                            image="/book-example.jpg"
                            targetDate = '2024-05-26T12:00:00'
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's conten"
                            />    
                        </Col>
                    </Row>
                </Carousel.Item>
                 
                {/* <!-- 第三篇簡介書本 --> */}
                <Carousel.Item interval={10000}  >
                    <Row xs={1} md={3} className="g-4" >
                        <Col >
                            <Processing 
                            title = "長板坡"
                            Stage = {false}
                            image="/book-example-3.jpg"
                            targetDate = '2024-05-26T12:00:00'
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                
                            />    
                        </Col>
                        <Col>
                            <Processing 
                            title = "長板坡"
                            Stage = {false}
                            image="/book-example-3.jpg"
                            targetDate = '2024-05-26T12:00:00'
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                    
                            
                            />    
                        </Col>
                        <Col>
                            <Processing 
                            title = "長板坡"
                            Stage = {false}
                            image="/book-example-3.jpg"
                            targetDate = '2024-05-26T12:00:00'
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's conten"
                            />    
                        </Col>
                    </Row>
                
                </Carousel.Item>
            </Carousel>



            {/* <!-- Voting Section --> */}
            <Row >
                <Col className="d-flex justify-content-between align-items-center">
                    <div>
                        <h2 class="text-2xl mt-5">All Publication</h2>
                        <h2 class="text-4xl font-bold mb-4 text-green">我要投票！</h2>

                    </div>
                <Button variant="outline-success" className={`${styles.btn_outline_processing}  mt-5 fs-5`}   onClick={() => window.location.href='/book/overview'}>所有投票</Button>
                </Col>


                
            </Row>

             {/* <!-- 書本簡介的傳送軸 --> */}
             <Carousel 
                bsPrefix={styles.custom_carousel_controls}
                activeIndex={index3} 
                onSelect={(selectedIndex) => setIndex3(selectedIndex)}
                variant="dark" 
                >
                {/* <!-- 第一篇簡介書本 --> */}
                <Carousel.Item interval={10000} >
                    <Row xs={1} md={3} className="g-4" >
                        <Col >
                            <Processing 
                            title = "夏天的規則"
                            Stage = {true}
                            image="/book-example-2.jpg"
                            targetDate = '2024-05-26T12:00:00'
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                            />    
                        </Col>
                        <Col>
                            <Processing 
                            title = "夏天的規則"
                            Stage = {true}
                            image="/book-example-2.jpg"
                            targetDate = '2024-05-26T12:00:00'
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                            />    
                        </Col>
                        <Col>
                            <Processing 
                            title = "夏天的規則"
                            Stage = {true}
                            image="/book-example-2.jpg"
                            targetDate = '2024-05-26T12:00:00'
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's conten"
                            />    
                        </Col>
                    </Row>
                </Carousel.Item>

                {/* <!-- 第二篇簡介書本 --> */}
                <Carousel.Item interval={10000}  >
                    <Row xs={1} md={3} className="g-4" >
                        <Col >
                            <Processing 
                            title = "大野狼才要小心"
                            Stage = {true}
                            image="/book-example.jpg"
                            targetDate = '2024-05-26T12:00:00'
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                            />    
                        </Col>
                        <Col>
                            <Processing 
                            title = "大野狼才要小心"
                            Stage = {true}
                            image="/book-example.jpg"
                            targetDate = '2024-05-26T12:00:00'
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                            />    
                        </Col>
                        <Col>
                            <Processing 
                            title = "大野狼才要小心"
                            Stage = {true}
                            image="/book-example.jpg"
                            targetDate = '2024-05-26T12:00:00'
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's conten"
                            />    
                        </Col>
                    </Row>
                </Carousel.Item>
                 
                {/* <!-- 第三篇簡介書本 --> */}
                <Carousel.Item interval={10000}  >
                    <Row xs={1} md={3} className="g-4" >
                        <Col >
                            <Processing 
                            title = "長板坡"
                            Stage = {true}
                            image="/book-example-3.jpg"
                            targetDate = '2024-05-26T12:00:00'
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                            />    
                        </Col>
                        <Col>
                            <Processing 
                            title = "長板坡"
                            Stage = {true}
                            image="/book-example-3.jpg"
                            targetDate = '2024-05-26T12:00:00'
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's content."
                            />    
                        </Col>
                        <Col>
                            <Processing 
                            title = "長板坡"
                            Stage = {true}
                            image="/book-example-3.jpg"
                            targetDate = '2024-05-26T12:00:00'
                            content="Some quick example text to build on the card title and make up the
                            bulk of the card's conten"
                            />    
                        </Col>
                    </Row>
                
                </Carousel.Item>
            </Carousel>
           
            


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
