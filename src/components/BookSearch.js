import React, { useState } from 'react';
import { Image, Row, Col, Button } from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import styles from '@/styles/book-search.module.css';
import { useTranslation } from 'react-i18next';

const BookSearch = () => {

  const books = [
    { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',eventKey : "123",eventIntro:"南無喝囉怛那哆囉夜耶．南無阿唎耶，婆盧羯帝爍缽囉耶．菩提薩埵婆耶． 摩訶薩埵婆耶．摩訶迦盧尼迦耶．唵，薩皤囉罰曳．數怛那怛寫．南無 悉吉慄埵伊蒙阿唎耶．婆盧吉帝室佛囉愣馱婆．南無那囉謹墀．醯利摩訶 皤哆沙咩．摩訶薩埵婆耶．摩訶迦盧尼迦耶．唵，薩皤囉罰曳．數怛那怛寫．南無 悉吉慄埵伊蒙阿唎耶．婆盧吉帝室佛囉愣馱婆．南無那囉謹墀．醯利摩訶 皤哆沙咩．" },
    { title: '夏天的規則', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-2.jpg',eventKey : "5111"},
    { title: '大野狼要小心', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example.jpg',eventKey : "511223" },
    { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',eventKey : "5442223" },
    { title: '夏天的規則', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-2.jpg',eventKey : "4423"},
    { title: '大野狼要小心', author: 'baxter', profile:'/profile-3.JPG', image: '/book-example.jpg',eventKey : "5444443" },
    { title: '長板坡', author: 'james baxter', profile:'/profile-3.JPG', image: '/book-example-3.jpg',eventKey : "5445553" },
    { title: '夏天的規則', author: 'baxter', profile:'/profile-3.JPG', image: '/book-example-2.jpg',eventKey : "54466" },
    { title: '大野狼要小心', author: 'baxter', profile:'/profile-3.JPG', image: '/book-example.jpg',eventKey : "54400" },
  ];
 
  const { t } = useTranslation();
  //設定query、isopen、results 的狀態
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  //suespring --> 定義動畫屬性
  const modalAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? `translateY(0)` : `translateY(-100%)`,
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };


  const handleSearch = async () => {
    if (query) {
      try {
        const filteredItems = books.filter((item) => {
          return item.eventKey && item.eventKey.toLowerCase() === query.toLowerCase();
        });
  
        setResults(filteredItems || []);
  
      } catch (error) {
        console.error('Error fetching data:', error);
        setResults([]);
      }
    }
  };




  return (
    <>
      <button className= {`text-black hover:underline ${styles.button}`} onClick={openModal}>{ t('Find Events') }</button>
      {isOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <animated.div
            className={styles.modalContent}
            style={modalAnimation}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={styles.closeButton} onClick={closeModal}>&times;</span>

            <h2 className='font-bold'>{t('Search by Activity Code')}</h2>
            
            <div className='d-flex  justify-content-between mt-4'>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('Enter Event Code...')}
                className={styles.input}
              />
              <button className={styles.searchButton} variant='warning' onClick={handleSearch}>{t('Search')}</button>
            </div>
            <hr className='mt-2 mb-3'/>
            {/* 結果輸出 */}
            <div className={styles.searchResults}>
             {console.log(results)}
              {results.length > 0 ? (
          

                 <Row className='my-2'>
                 <Col>
                 <Image 
                   src={results[0].image} 
                   className=' rounded-md '
                   />
                 </Col>
                 <Col className='flex flex-col justify-content-between '>
                   <Row>
                     <Col className='text-3xl font-bold border-radius-5px'>{results[0].title}</Col>
                   </Row>
                   <Row className='mt-2 '>
                     <Col className='flex text-lg'>
                       <Image
                         src={results[0].profile} 
                         width='25px' 
                         alt='Example of Profile'
                         className='rounded-full shadow-sm mr-3'
                       />
                       <span className='ml-1'>{results[0].author}</span>
                     </Col>
                   </Row>
                   <Row>
                     <span className={`ml-1 mt-2  ${styles.text_truncate_multiline}`}>{results[0].eventIntro}</span>
                   </Row>
                   <Row>
                     <Button variant="outline-success" className={`${styles.btn_outline_finish}  mt-4 fs-8`}   onClick={() => window.location.href='/book/processing'} >
                       {t('Join Activity!')}
                     </Button>
                   </Row>
                 </Col>
               </Row>
             
              ) : (
                <p>
                  {t('No relevant books found.')}
                </p>
              )}
            </div>
          </animated.div>
        </div>
      )}
    </>
  );
};

export default BookSearch;
