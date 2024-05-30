import { Buffer } from 'buffer';

const convertImage = (image) => {
	if (image) {
		const base64 = Buffer.from(image.data, 'binary').toString('base64');
		return `data:image/png;base64,${base64}`;
	}
	return null;
};

export default convertImage;
