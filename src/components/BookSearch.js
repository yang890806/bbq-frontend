import getConfig from 'next/config';
import React, { useEffect,useState } from 'react';
import { Image, Row, Col, Button } from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import axios from '@/utils/axios';
import getLoggedUser from '@/auth/getLoggedUser';
import convertImage from '@/components/convertImage';
import styles from '@/styles/book-search.module.css';

const { 
	publicRuntimeConfig: { frontendRoot } 
} = getConfig();

const BookSearch = () => {

	const [books, setBooks] = useState([]);
	const [bookInfo1, setBookInfo1] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);

	const showWarningMsg = () => {
		Swal.fire({
			'title': t('Please log in first.'), 
			'icon': 'warning', 
			'confirmButtonColor': '#F5C265', 
		});
	};

	const fetchBook = async() => {
		try {

			const user = getLoggedUser();
			if (!user) {
				showWarningMsg();
				return;
			}

			// 分別發送三個不同的請求
			const response1 = await axios.get(`/allEvent/${user}`, { params: { eventStatus: 1 } });
			const response2 = await axios.get(`/allEvent/${user}`, { params: { eventStatus: 2 } });

			const combinedData = response1.data.concat(response2.data);

			const privacyevent = combinedData.filter(event => event.eventKey);
			setBookInfo1(privacyevent);

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
		setBooks(bookInfo1);
		}
	}, [dataLoaded, bookInfo1]);
	
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

	const handleJoin = async () => {

		const user = getLoggedUser();
		if (!user) {
			showWarningMsg();
			return;
		}

		await axios.post('/event/user', { user_id: user, event_key: query.toLowerCase() }, {})
			.then((res) => {
				if (res.status === 200) {
					showSuccessMsg(res?.data?.data);
				}
				else {
					showErrorMsg();
				}
			})
			.catch((error) => {
				console.log('Join event error:', error);
			});
	};

	const showSuccessMsg = (book) => {
		Swal.fire({
			'title': t('Success'), 
			'text': t('You have joined the event!'), 
			'icon': 'success', 
			'confirmButtonColor': '#F5C265', 
		}).then((result) => {
			if (result.isConfirmed) {
				window.location.replace(`${frontendRoot}/book/${book}`);
			}
		});
	};


	const handleSearch = async () => {
		if (query) {
		try {
			const filteredItems = books.filter((item) => {
			return item.eventKey && item.eventKey.toLowerCase() === query.toLowerCase();
			});
			console.log(filteredItems)
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
                   src={convertImage(results[0].eventImage)} 
                   className=' rounded-md '
                   />
                 </Col>
                 <Col className='flex flex-col justify-content-between '>
                   <Row>
                     <Col className='text-3xl font-bold border-radius-5px'>{results[0].eventTitle}</Col>
                   </Row>
                   <Row className='mt-2 '>
                     <Col className='flex text-lg'>
                       <Image
                         src={convertImage(results[0].creator.avatar)} 
                         width='25px' 
                         alt='Example of Profile'
                         className='rounded-full shadow-sm mr-3'
                       />
                       <span className='ml-1'>{results[0].creator.username}</span>
                     </Col>
                   </Row>
                   <Row>
                     <span className={`ml-1 mt-2  ${styles.text_truncate_multiline}`}>{results[0].eventIntro}</span>
                   </Row>
                   <Row>
                     <Button variant="outline-success" className={`${styles.btn_outline_finish}  mt-4 fs-8`}   onClick={handleJoin} >
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
