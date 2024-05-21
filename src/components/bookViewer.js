import getConfig from 'next/config';
import { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Page from '@/components/page';

const { publicRuntimeConfig } = getConfig();

function BookViewer({ pages }) {

	const imageWidth = publicRuntimeConfig.imageWidth;
	const imageHeight = publicRuntimeConfig.imageHeight;

	const book = useRef();
	const [curPage, setCurPage] = useState(0);

	const goToPrevPage = () => {
		book.current.pageFlip().flipPrev();
	};

	const goToNextPage = () => {
		book.current.pageFlip().flipNext();
	};

	const onFlip = () => {
		setCurPage(book.current.pageFlip().getCurrentPageIndex());
	};

	return (
		<>
		<button onClick={goToPrevPage} disabled={curPage === 0} className='mr-2'>
			<FontAwesomeIcon icon={ faChevronLeft } size='xl'/>
		</button>
        <HTMLFlipBook ref={book} onFlip={onFlip} width={imageWidth} height={imageHeight} drawShadow={false}>
			{ pages.map((page, i) => <Page key={i + 1} number={i+1} page={page}></Page>) }
        </HTMLFlipBook>
		<button onClick={goToNextPage} disabled={curPage === pages.length - 1} className='ml-2'>
			<FontAwesomeIcon icon={ faChevronRight } size='xl'/>
		</button>
		</>
    );
}

export default BookViewer;
