import Image from 'next/image';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

function SinglePage({ index, page }) {
	return (
		<div style={{width: '500px'}} className='mx-1'>
			<div className='flex my-2 justify-center text-lg'>
				<span className='mx-3'>{page.title}</span>
				<Image 
					src='/profile-1.JPG' 
					width={30}
					height={30}
					alt='Example of Profile'
					className='rounded-full shadow-sm'
				/>
				<span className='mx-2'>Puppy</span>
			</div>
			<div className='h-96 flex justify-center'>
				<Image 
					src={page.img} 
					width={0} 
					height={0} 
					sizes='100vw'
					style={{ width: 'auto', height: '100%' }}
					alt={`Page ${index}`} 
				/>
			</div>
			<div className='text-center h-24 overflow-y-scroll'>{page.desc}</div>
		</div>
	);
}

export default SinglePage;
