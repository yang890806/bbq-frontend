import Image from 'next/image';
import { useState } from 'react';
import { Carousel } from 'react-bootstrap';

function ImageCarousel({ images, width, height, onClick }) {
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};

	return (
		<Carousel activeIndex={index} onSelect={handleSelect} data-bs-theme="dark">
		{
			images.map((image, i) => <Carousel.Item key={i}>
				<div onClick={onClick} style={{width: `${width}px`, height: `${height}px`}}>
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
