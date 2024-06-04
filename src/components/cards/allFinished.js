import { Card } from 'react-bootstrap';
import styles from '@/styles/card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Avatar from '@/components/avatar';

function AllFinished({ book, title, image, author, profile, viewer }) {
	return (
		<Card className={styles.bookcard_allfinished} onClick={() => window.location.href=`/book/${book}/overview`} >
			<Card.Title className='fw-bold fs-4 text-center'>{title}</Card.Title>
			<Card.Img 
				src={image ?? '/image-not-found.jpg'} 
				className={styles.bookcard_allfinished_image}
			/>
			<Card.Body>
				<div className='flex justify-between'>
					<div className='flex'>
						<FontAwesomeIcon icon={faEye} className="mt-1 mr-2 flex flex-row text-red" />
						<Card.Text className="mr-2 flex flex-row">{viewer}</Card.Text>
					</div>
					<div className='flex items-center'>
						<Avatar 
							avatar={profile} 
							username={author} 
							width={23}
							height={23}
							className='mr-1'
						/>
						<Card.Text>{author}</Card.Text>
					</div>
				</div>
		 </Card.Body>
		</Card>

	)
}

export default AllFinished;
