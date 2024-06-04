import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import getLoggedUser from '@/auth/getLoggedUser';
import VotePage from '@/components/votePage';
import axios from '@/utils/axios';
import styles from '@/styles/book.module.css';

function ChapterVoting({ chapter, className }) {

	const { t } = useTranslation();

	const [pages, setPages] = useState([]);
	const [selectedPage, setSelectedPage] = useState(null);

	const handleClickPage = (index) => {
		const newIndex = (index !== selectedPage) ? index : null;
		setSelectedPage(newIndex);
	};

	const fetchPages = async() => {
		await axios.get(`/allPage/${chapter.cId}`, {}, {})
			.then((res) => {
				console.log('pages:', res?.data);
				if (res.status === 200) {
					setPages(res?.data);
				}
			})
			.catch((error) => {
				console.log('Fetch pages error:', error);
			});
	};

	const showSuccessMsg = () => {
		Swal.fire({
			'title': t('Vote successfully!'), 
			'icon': 'success', 
			'confirmButtonColor': '#F5C265', 
		});
	};

	const showErrorMsg = () => {
		Swal.fire({
			'title': t('Fails to vote the page'), 
			'text': t('Please try again.'), 
			'icon': 'error', 
			'confirmButtonColor': '#F5C265', 
		});
	};

	const showWarningMsg = () => {
		Swal.fire({
			'title': t('Please log in first.'), 
			'icon': 'warning', 
			'confirmButtonColor': '#F5C265', 
		});
	};

	const sendVote = async() => {

		const user = getLoggedUser();
		if (!user) {
			showWarningMsg();
			return;
		}

		const pageId = pages[selectedPage]?.pId;
		await axios.put(`/vote/${user}/${pageId}`, {}, {})
			.then((res) => {
				if (res.status === 200) {
					showSuccessMsg();
				}
				else {
					showErrorMsg();
				}
			})
			.catch((error) => {
				console.log('Vote page error:', error);
			});

	};

	useEffect(() => {
		fetchPages();
	}, [chapter]);

	return (
		<>
		<Row className={`bg-gray-200 shadow-sm rounded-md p-3 my-2 ${className}`}>
			<Col>
				<Row>
					<Col className='px-4 flex w-96 overflow-x-scroll'>
						{pages?.map((page, index) => <VotePage index={index} page={page} selected={index === selectedPage} handleClick={handleClickPage}/>)}
					</Col>
				</Row>
				<Row className='mt-3'>
					<Col className='flex justify-center'>
						<div className={styles.btn} onClick={sendVote}>
							{ t('Vote') }
						</div>
					</Col>
				</Row>
			</Col>
		</Row>
		</>
	);
}

export default ChapterVoting;
