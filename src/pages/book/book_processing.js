import Head from 'next/head';
import Image from 'next/image';
import getConfig from 'next/config';
import NavBar from '@/components/navbar';
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import styles from '@/styles/book-home.module.css';

import React from 'react'
import All_processing from '@/components/all_processing';

function book_processing() {

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
              <h2 class="text-4xl font-bold mb-4 text-green">所有投票</h2>
            </div>
          </Col>
        </Row>

        <Row xs={1} md={5} className="g-4">
          <All_processing 
            title = "長板坡"
            author = "james baxter"
            profile = "/profile-3.JPG"
            image="/book-example-3.jpg"
            targetDate = '2024-05-25T00:00:00'
          />  
          <All_processing 
            title = "長板坡"
            author = "james baxter"
            profile = "/profile-3.JPG"
            image="/book-example-3.jpg"
            targetDate = '2024-05-25T00:00:00'
          />  
          <All_processing 
            title = "長板坡"
            author = "james baxter"
            profile = "/profile-3.JPG"
            image="/book-example-3.jpg"
            targetDate = '2024-05-25T00:00:00'
          />  
          <All_processing 
            title = "長板坡"
            author = "james baxter"
            profile = "/profile-3.JPG"
            image="/book-example-3.jpg"
            targetDate = '2024-05-25T00:00:00'
          />  
          <All_processing 
            title = "長板坡"
            author = "james baxter"
            profile = "/profile-3.JPG"
            image="/book-example-3.jpg"
            State="true"
            targetDate = '2024-05-25T00:00:00'
          />  

          <All_processing 
            title = "長板坡"
            author = "james baxter"
            profile = "/profile-3.JPG"
            image="/book-example-3.jpg"
            State="true"
        
            targetDate = '2024-05-25T00:00:00'
          />  









        </Row>
        
      
      </Container>
   








    </>
  )
}

export default book_processing
