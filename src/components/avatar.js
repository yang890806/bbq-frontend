import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import convertImage from '@/components/convertImage';

function Avatar({ avatar, username, width, height, className }) {
	return (
		avatar ? (
			<Image
				src={convertImage(avatar)}
				width={width}
				height={height}
				alt={username}
				className={`rounded-full shadow-sm ${className}`}
			/>
		): (
			<FontAwesomeIcon icon={faCircleUser} size='lg' className={`text-green ${className}`}/>
		)
	);
}

export default Avatar;
