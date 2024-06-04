import { Card } from 'react-bootstrap';
import Avatar from '@/components/avatar';
import styles from '@/styles/card.module.css';

function Cards({ book, title , content, image, author, profile }) {
  return (
	<Card className={styles.bookcard} onClick={() => window.location.href=`/book/${book}/overview`} >
		<Card.Img 
			variant="top" 
			src={image} 
			className={styles.bookcard_image}
		/>
			
		<Card.Body>
			<div  className="d-flex justify-between items-start">
				<Card.Title className='font-bold fs-5'>{title}</Card.Title>
				<div className='flex items-center'>
					<Avatar 
						avatar={profile} 
						username={author} 
						width={20}
						height={20}
						className='mr-1'
					/>
					<Card.Text className='fs-7'>{author}</Card.Text>
				</div>
			</div>
			<Card.Text className={`mt-1 mb-1 ${styles.text_truncate_multiline} `} >{content}</Card.Text>
		</Card.Body>
	</Card>
  );
}

export default Cards;
