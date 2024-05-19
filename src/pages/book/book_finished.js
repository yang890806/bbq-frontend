import Head from 'next/head';
import Image from 'next/image';
import getConfig from 'next/config';
////////////////////////////////////
import NavBar from '@/components/navbar';
import All_finished from '@/components/all_finished';
import Processing from '@/components/cards_processing.js';
////////////////////////////////////
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
///////////////////////////////////////
import styles from '@/styles/book-home.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleUp } from '@fortawesome/free-solid-svg-icons';

function book_finished() {
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
          <Col className="d-flex justify-content-between align-items-center"  >
            <div>
              <h2 class="text-2xl mt-5">All Publication</h2>
              <h2 class="text-4xl font-bold mb-4 text-red">所有出版刊物</h2>
            </div>
          </Col>
        </Row>
        <Row  xs={1} md={5} className="g-4" >
        <Col >
              <All_finished 
              title = "長板坡"
              author = "james baxter"
              profile = "/profile-3.JPG"
              image="/book-example-3.jpg"
              viewer = "3303"
              />    
          </Col>
          <Col >
              <All_finished 
              title = "夏天的規則"
              author = "james baxter"
              profile = "/profile-3.JPG"
              image="/book-example-2.jpg"
              viewer = "3223"
              />    
          </Col>
          <Col >
              <All_finished 
              title = "長板坡"
              author = "james baxter"
              profile = "/profile-3.JPG"
              image="/book-example-3.jpg"
              viewer = "3303"
              />    
          </Col>
          <Col >
              <All_finished 
              title = "大野狼要小心"
              author = "james baxter"
              profile = "/profile-3.JPG"
              image="/book-example.jpg"
              viewer = "3303"
              />    
          </Col>
          <Col >
              <All_finished 
              title = "夏天的規則"
              author = "james baxter"
              profile = "/profile-3.JPG"
              image="/book-example-2.jpg"
              viewer = "3303"
              />    
          </Col>
          <Col >
              <All_finished 
              title = "大野狼要小心"
              author = "james baxter"
              profile = "/profile-3.JPG"
              image="/book-example.jpg"
              viewer = "3303"
              />    
          </Col>
          <Col >
              <All_finished 
              title = "長板坡"
              author = "james baxter"
              profile = "/profile-3.JPG"
              image="/book-example-3.jpg"
              viewer = "3303"
              />    
          </Col>
          <Col >
              <All_finished 
              title = "大野狼要小心"
              author = "james baxter"
              profile = "/profile-3.JPG"
              image="/book-example.jpg"
              viewer = "3303"
              />    
          </Col>
          <Col >
              <All_finished 
              title = "夏天的規則"
              author = "james baxter"
              profile = "/profile-3.JPG"
              image="/book-example-2.jpg"
              viewer = "3303"
              />    
          </Col>
          <Col >
              <All_finished 
              title = "大野狼要小心"
              author = "james baxter"
              profile = "/profile-3.JPG"
              image="/book-example.jpg"
              viewer = "3303"
              />    
          </Col>
          <Col >
              <All_finished 
              title = "長板坡"
              author = "james baxter"
              profile = "/profile-3.JPG"
              image="/book-example-3.jpg"
              viewer = "3303"
              />    
          </Col>
          <Col >
              <All_finished 
              title = "大野狼要小心"
              author = "james baxter"
              profile = "/profile-3.JPG"
              image="/book-example.jpg"
              viewer = "3303"
              />    
          </Col>
          <Col >
              <All_finished 
              title = "夏天的規則"
              author = "james baxter"
              profile = "/profile-3.JPG"
              image="/book-example-2.jpg"
              viewer = "3303"
              />    
          </Col>
          <Col >
              <All_finished 
              title = "大野狼要小心"
              author = "james baxter"
              profile = "/profile-3.JPG"
              image="/book-example.jpg"
              viewer = "3303"
              />    
          </Col>
          <Col >
              <All_finished 
              title = "長板坡"
              author = "james baxter"
              profile = "/profile-3.JPG"
              image="/book-example-3.jpg"
              viewer = "3303"
              />    
          </Col>
        </Row>





      </Container>
    </>
  )
}

export default book_finished

