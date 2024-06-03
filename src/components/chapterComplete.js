import Image from 'next/image';
import getConfig from 'next/config';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import convertImage from '@/components/convertImage';

const { 
	publicRuntimeConfig: { imageWidth, imageHeight } 
} = getConfig();

function ChapterComplete({ chapter, className }) {

	const { t } = useTranslation();

	return (
		<Row className={`bg-gray-200 shadow-sm rounded-md p-3 my-2 ${className}`}>
			<Col xs={4}>
				<Image 
					src={convertImage(chapter?.finishedpage?.imageContent) ?? '/book-example.JPG'} // TEST
					width={imageWidth / 1.5}
					height={imageHeight / 1.5}
					alt='Image'
					className='rounded shadow object-cover'
				/>
			</Col>
			<Col className='bg-white p-6 shadow-md'>
				<p className='text-gray-700 text-base mb-4'>{chapter?.finishedpage?.textContent}</p>
				<p className="text-gray-700 text-base font-bold">{t('Author')}: {chapter?.finishedpage?.pageCreator?.username}</p>
			</Col>
		</Row>
	);
}

export default ChapterComplete;
