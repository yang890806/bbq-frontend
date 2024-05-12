import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SinglePage from './singlePage';

function BookReader({ pages }) {

	const [curPage, setCurPage] = useState(0);

	const goToNextPage = () => {
		if (curPage < pages.length - 2) {
			setCurPage(curPage + 2);
		}
	};

	const goToPrevPage = () => {
		if (curPage > 1) {
			setCurPage(curPage - 2);
		}
	};

	return (
		<div className='flex justify-center'>
			<button onClick={goToPrevPage} disabled={curPage === 0} className='mr-2'>
				<FontAwesomeIcon icon={ faChevronLeft } size='xl'/>
			</button>
			<div className='flex'>
				{ (curPage >= 0) && <SinglePage index={curPage + 1} page={pages[curPage]}/> }
				{ (curPage + 1 < pages.length) && <SinglePage index={curPage + 2} page={pages[curPage + 1]}/>}
			</div>
			<button onClick={goToNextPage} disabled={curPage === pages.length - 1} className='ml-2'>
				<FontAwesomeIcon icon={ faChevronRight } size='xl'/>
			</button>
		</div>
	);
}

export default BookReader;
