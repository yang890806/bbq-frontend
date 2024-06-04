import React, { useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import convertImage from '@/components/convertImage';
import Avatar from '@/components/avatar';

const Page = React.forwardRef((props, ref) => {

	return (
		<div ref={ref} style={{width: '500px'}} className='mx-1 bg-light-cream'>
			<div className='flex flex-row my-2 justify-center items-center'>
				<span className='font-bold mx-3' style={{fontSize: '24px'}}>{props?.page?.chapterTitle}</span>
				<div className='pt-1 flex items-center'>
					<Avatar 
						avatar={props?.page?.finishedpage?.pageCreator?.avatar} 
						username={props?.page?.finishedpage?.pageCreator?.username} 
						width={30}
						height={30}
						className='mr-1'
					/>
					<span className='mx-1'>{props?.page?.finishedpage?.pageCreator?.username}</span>
				</div>
			</div>
			<div className='h-96 flex justify-center'>
				<Image 
					src={convertImage(props?.page?.finishedpage?.imageContent) ?? '/image-not-found.jpg'} 
					width={0} 
					height={0} 
					sizes='10vw'
					style={{ width: 'auto', height: '95%' }}
					alt={`Page ${props?.pageNumber}`} 
				/>
			</div>
			<div className='text-center h-24 overflow-y-scroll'>{props?.page?.finishedpage?.textContent}</div>
		</div>
	);
});

Page.displayName = 'Page';

export default Page;
