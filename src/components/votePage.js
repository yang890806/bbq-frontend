import Image from 'next/image';
import getConfig from 'next/config';
import convertImage from '@/components/convertImage';

const { 
	publicRuntimeConfig: { imageWidth, imageHeight } 
} = getConfig();

function VotePage({ index, page, selected, handleClick }) {
	return (
		<div 
			key={index} 
			className={`flex flex-col items-center min-w-60 p-3 mx-2 rounded-lg cursor-pointer hover:scale-95 ${selected ? 'bg-yellow' : 'bg-white'}`}
			onClick={() => handleClick(index)}
		>
			<Image 
				src={convertImage(page?.imageContent) ?? '/image-not-found.jpg'}
				width={imageWidth / 3}
				height={imageHeight / 3}
				alt='Image'
				className='rounded shadow object-cover'
			/>
			<div className='w-48 pl-2'>
				<p className='text-gray-900 text-lg leading-tight my-2'>{`By. ${page?.pageCreator?.username}`}</p>
				<p>{page?.textContent}</p>
			</div>
		</div>
	);
}

export default VotePage;
