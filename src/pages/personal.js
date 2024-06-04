import Head from 'next/head';
import getConfig from 'next/config';
import { useEffect,useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { HashLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import getLoggedUser from '@/auth/getLoggedUser';
import NavBar from '@/components/navbar';
import axios from '@/utils/axios';
import convertImage from '@/components/convertImage';
import PersonalParticipate from '@/components/cards/personalParticipate';
import styles from '@/styles/book-brief.module.css';

const { 
	publicRuntimeConfig: { frontendRoot } 
} = getConfig();

function BookPersonal() {

	const { t } = useTranslation();

	const [state, setState] = useState('ALL');
	const [activeTab, setActiveTab] = useState('ALL');
	const [books, setBooks] = useState([]);
	const [filteredBooks, setFilteredBooks] = useState([]);
	const [showLoading, setShowLoading] = useState(false);

	const showWarningMsg = () => {
		Swal.fire({
			'title': t('Please log in first.'), 
			'icon': 'warning', 
			'confirmButtonColor': '#F5C265', 
		}).then((result) => {
			if (result.isConfirmed) {
				window.location.replace(frontendRoot);
			}
		});
	};
	
	const fetchBooks = async() => {
		try {
			setShowLoading(true);

			const user = getLoggedUser();
			if (!user) {
				showWarningMsg();
				return;
			}

			var url = '';
			switch(activeTab) {
				case 'CREATE':
					url = `/allCreatedEvent/${user}`;
					break;
				case 'PARTICIPATE':
					url = `/allUploadEvent/${user}`;
					break;
				default:
					url = `/myAllEvents/${user}`;
					break;
			}

			await axios.get(url, {}, {})
				.then((res) => {
					if (res.status === 200) {
						setBooks(res?.data);
					}
				})
				.catch((error) => {
					console.log(`Fetch ${url} error:`, error);
				});

			setShowLoading(false);

		} catch (error) {
			console.log('Fetch book error:', error);
		}
	};

	// 篩選公開、私人狀態
	const filterBooks = () => {
		var newFilteredBooks = books;
		switch (state) {
			case 'PUBLIC':
				newFilteredBooks = books.filter(book => !book.eventKey);
				break;
			case 'PRIVATE':
				newFilteredBooks = books.filter(book => book.eventKey);
				break;
			default:
				break;
		}
		setFilteredBooks(newFilteredBooks);
	};

	useEffect(() => {
		fetchBooks();
	}, [activeTab]);

	useEffect(() => {
		filterBooks();
	}, [books, state]);

	return (
		<>
		<Head>
			<title>BBQ</title>
			<meta
			property='og:description'
			content='BBQ - BoundlessBrushQuill'
			/>
		</Head>
		<NavBar/>  

		<Container>
			{/* <!-- Latest Publication Section --> */}
			<Row>
				<Col className='d-flex justify-content-between align-items-center  mt-5' >
					{/* Title 顯示 */}
					<div>
						<h2 className='text-2xl'>My Events</h2>
						<h2 className='text-4xl font-bold mb-4'>我的活動</h2>

					</div>
					<div className='flex items-center'>
						<div className='mr-3'>
							<Form.Select className='fs-7' onChange={(e) => setState(e.target.value)}>
								<option value='ALL'>{t('All')}</option>
								<option value='PUBLIC' >{t('Public')}</option>
								<option value='PRIVATE' >{t('Private')}</option>
							</Form.Select>
						</div>
						
						<div className='ml-auto'>
							<Button className={(activeTab === 'ALL') ? styles.activeToggleBtn : styles.toggleBtn} onClick={() => setActiveTab('ALL')}>
								{t('Show All')}
							</Button>
							<Button className={(activeTab === 'CREATE') ? styles.activeToggleBtn : styles.toggleBtn} onClick={() => setActiveTab('CREATE')}>
								{t('Create')}
							</Button>
							<Button className={(activeTab === 'PARTICIPATE') ? styles.activeToggleBtn : styles.toggleBtn} onClick={() => setActiveTab('PARTICIPATE')}>
								{t('Participate')}
							</Button>
						</div>
					</div>
				</Col> 
			</Row>
			<Row>
				{filteredBooks?.map((book, index) => 
					<Col xs={4} md={3}>
						<PersonalParticipate 
							key={index}
							book={book?.eId}
							title={book?.eventTitle} 
							image={convertImage(book?.eventImage) ?? '/image-not-found.jpg'} 
							creator={book?.creator?.uId}
							targetDate={book?.time?.submitTime} 
							part={book?.totalChapterNum} 
							state={book?.eventKey ? 'PRIVATE' : 'PUBLIC'}
							publish={book?.isPublish}
							code={book?.eventKey}
						/>
					</Col>
				)}
			</Row>
		</Container>
		{/* Loading動畫 */}
		{showLoading && (
			<div className='w-screen h-screen absolute z-[999] top-0 left-0 flex justify-center items-center bg-opacity-75 bg-black'>
				<HashLoader color='#F5C265' loading={showLoading} aria-label='Loading' />
			</div>
		)}
		</>
	)
}

export default BookPersonal;
