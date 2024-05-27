import React from 'react';
import Image from 'next/image';

const Page = React.forwardRef((props, ref) => {
	return (
		<div ref={ref} style={{width: '500px'}} className='mx-1 bg-light-cream'>
			<div className='flex my-2 justify-center text-lg'>
				<span className='mx-3'>{props.page.title}</span>
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
					src={props.page.img} 
					width={0} 
					height={0} 
					sizes='100vw'
					style={{ width: 'auto', height: '100%' }}
					alt={`Page ${props.number}`} 
				/>
			</div>
			<div className='text-center h-24 overflow-y-scroll'>{props.page.desc}</div>
		</div>
	);
});

Page.displayName = 'Page';

export default Page;
