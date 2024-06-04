import getConfig from 'next/config';
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import { useTranslation } from 'react-i18next';
import getLoggedUser from '@/auth/getLoggedUser';
import Swal from 'sweetalert2';
import axios from '@/utils/axios';
import styles from '@/styles/book-search.module.css';

const { 
	publicRuntimeConfig: { frontendRoot } 
} = getConfig();

const BookSearch = () => {

	const [books, setBooks] = useState([]);

	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [queryCode, setQueryCode] = useState('');

	//suespring --> 定義動畫屬性
	const modalAnimation = useSpring({
		opacity: isOpen ? 1 : 0,
		transform: isOpen ? `translateY(0)` : `translateY(-100%)`,
	});

	const openModal = () => setIsOpen(true);
	const closeModal = () => {
		setIsOpen(false);
	};

	const showWarningMsg = () => {
		Swal.fire({
			'title': t('Please log in first.'), 
			'icon': 'warning', 
			'confirmButtonColor': '#F5C265', 
		});
	};

	const showErrorMsg = () => {
		Swal.fire({
			'title': t('Error'), 
			'text': t('No event is found...'), 
			'icon': 'error', 
			'confirmButtonColor': '#F5C265', 
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

	const handleJoin = async () => {

		const user = getLoggedUser();
		if (!user) {
			showWarningMsg();
			return;
		}

		await axios.post('/event/user', { user_id: user, event_key: queryCode }, {})
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
						<Container>
							<Row>
								<Col className='flex justify-between items-center'>
									<div className='text-xl font-bold'>
										{t('Find Events')}
									</div>
									<div className={styles.closeButton} onClick={closeModal}>&times;</div>
								</Col>
							</Row>
							<Row>
								<Col>
									<div className='d-flex justify-content-between mt-4'>
										<input
											type="text"
											value={queryCode}
											onChange={(e) => setQueryCode(e.target.value)}
											placeholder={t('Enter Event Code...')}
											className={styles.input}
										/>
										<button className={styles.searchButton} variant='warning' onClick={handleJoin}>{t('Join')}</button>
									</div>
									<hr className='mt-2 mb-3'/>
								</Col>
							</Row>
						</Container>
					</animated.div>
				</div>
			)}
		</>
	);
};

export default BookSearch;
