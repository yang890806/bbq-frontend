import { Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styles from '@/styles/card.module.css';

function Processing({ book, title , content, image, stage  }) {

	const { t } = useTranslation();

	return (
		<Card  className={styles.bookcard} onClick={() => window.location.href=`/book/${book}`} >
			<Card.Img 
				variant='top' 
				src={image} 
				className={styles.bookcard_image}
			/>
			<Card.Body>
				<div  className='d-flex justify-content-between align-items-center'>
					<Card.Title className='fw-bold fs-5'>{title}</Card.Title>
				</div>
				<div  className='d-flex justify-content-between align-items-center'>
					<Card.Text style={{ width: '150px' }} className={styles.text_truncate_multiline} >{content}</Card.Text>
					<Button className={stage ? styles.voteBtn : styles.chainBtn}>{stage ? <p> {t('我要投票！')}</p> : <p>{t('接龍進行中')}</p>} </Button>
				</div>
			</Card.Body>
		</Card>

	);
}

export default Processing;
