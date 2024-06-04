import { Button, Card, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Avatar from '@/components/avatar';
import CountdownTimer from '@/components/countdownTimer';
import styles from '@/styles/card.module.css';

function AllProcessing({ book, title, image, author, profile, targetDate, state, part } ) {

	const { t } = useTranslation();

	return (
		<div className={styles.bookcard_allprocessing} >
			<div  className='d-flex justify-content-between align-items-center mb-2'>
				<Card.Title className={`fw-bold ${ styles.bookcard_cardtitle}`}>{title}</Card.Title>
				<div className='flex items-center mr-3'>
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

			<Card className='border-none bg-white shadow' onClick={() => window.location.href=`/book/${book}`} >
				<Card.Img 
					src={image ?? '/image-not-found.jpg'} 
					className={`shadow-sm ${styles.bookcard_allprocessing_image}`}
				/>
				<Card.Body>
					<div  className='d-flex justify-content-between align-items-end'>
						<div >
							<Card.Text className='mr-2 flex flex-row fw-semibold text-green'>{t('Paragraph')} {part}</Card.Text>
							<Card.Text className='fw-semibold text-dark-cream'>
								{`${t('剩餘時間')}: `}
								<CountdownTimer targetDate={targetDate}></CountdownTimer>
							</Card.Text>
						</div>
						<Button style={{ fontSize: '12px' }} className={`px-2 ${state ? styles.voteBtn : styles.chainBtn}`}>{state ? <p>{t('我要投票！')}</p> : <p>{t('接龍進行中')}</p>} </Button>
					</div>
				</Card.Body>

			</Card>

		</div>
	)
}

export default AllProcessing;
