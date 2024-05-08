import getConfig from 'next/config';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ImageCarousel from '@/components/imageCarousel';

const { publicRuntimeConfig } = getConfig();

const ImageUpload = () => {
	const [imagesURL, setImagesURL] = useState([]);
	const imageWidth = publicRuntimeConfig.imageWidth / 1.3;
	const imageHeight = publicRuntimeConfig.imageHeight / 1.3;

	const fileUploadRef = useRef();

	const handleImageUpload = (event) => {
		event.preventDefault();
		fileUploadRef.current.click();
	};

	const uploadImageDisplay = async() => {
		try {
			const uploadedFiles = fileUploadRef.current.files;

			var newImagesURL = [];
			for (var i=0; i < uploadedFiles.length; i++) {
				newImagesURL.push(URL.createObjectURL(uploadedFiles[i]));
			}

			setImagesURL(newImagesURL);
		} catch(error) {
			console.error(error);
			setImagesURL([]);
		}
	};
	
	return (
		<div>
			<form id="form" encType='multipart/form-data'>
				{ (imagesURL.length > 0) && (
					<ImageCarousel 
						images={imagesURL} 
						width={imageWidth} 
						height={imageHeight} 
						onClick={handleImageUpload} 
					/>
				)}
				{ !(imagesURL.length > 0) && (
					<button
						type='submit'
						onClick={handleImageUpload}
						style={{width: `${imageWidth}px`, height: `${imageHeight}px`}}
						className='bg-zinc-200 rounded'
					>
						<FontAwesomeIcon icon={ faPlus } size='2xl' className='text-white'/>
					</button>
				)}
				<input 
					type='file'
					id='file'
					multiple='multiple'
					ref={fileUploadRef}
					onChange={uploadImageDisplay}
					hidden
				 />
			</form>
		</div>
	);
}

export default ImageUpload;