import Image from 'next/image';
import getConfig from 'next/config';
import { useState } from 'react';
import { Carousel } from 'react-bootstrap';

const { publicRuntimeConfig } = getConfig();

function ImageCarousel({ images }) {
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};

	return (
		<Carousel activeIndex={index} onSelect={handleSelect} data-bs-theme="dark">
		{
			images.map((image, i) => <Carousel.Item key={i}>
				<div style={{width: `${publicRuntimeConfig.imageWidth}px`, height: `${publicRuntimeConfig.imageHeight}px`}}>
					<Image 
						src={image}
						fill={true}
						alt={`Image ${i}`}
						className='rounded shadow'
					/>
				</div>
			</Carousel.Item>)
		}
		</Carousel>
	);
}

export default ImageCarousel;
