import Image from 'next/image';
import getConfig from 'next/config';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ImageCarousel from '@/components/imageCarousel';

const { 
	publicRuntimeConfig: { imageWidth, imageHeight } 
} = getConfig();

const ImageUpload = ({ image, handleImage, className, iconColor }) => {
	const imgWidth = imageWidth / 1.6;
	const imgHeight = imageHeight / 1.6;

	const fileUploadRef = useRef();

	const handleImageUpload = (event) => {
		event.preventDefault();
		fileUploadRef.current.click();
	};

	const uploadImageDisplay = async() => {
		try {
			const uploadedFile = fileUploadRef.current.files[0];
			handleImage(uploadedFile);
		} catch(error) {
			console.error(error);
		}
	};
	
	return (
		<div className='flex justify-center items-center'>
			<form id="form" encType='multipart/form-data'>
				{ image && (
					<Image 
						src={URL.createObjectURL(image)}
						width={imgWidth}
						height={imgHeight}
						alt='Image'
						className='rounded shadow object-cover cursor-pointer'
						onClick={handleImageUpload}
					/>
				)}
				{!image && (
					<button
						type='submit'
						onClick={handleImageUpload}
						style={{width: `${imgWidth}px`, height: `${imgHeight}px`}}
						className={className ?? 'bg-zinc-200 rounded'}
					>
						<FontAwesomeIcon icon={faPlus} size='2xl' className={iconColor ?? 'text-white'}/>
					</button>
				)}
				<input 
					type='file'
					id='file'
					accept='image/*'
					ref={fileUploadRef}
					onChange={uploadImageDisplay}
					hidden
				 />
			</form>
		</div>
	);
}

export default ImageUpload;
