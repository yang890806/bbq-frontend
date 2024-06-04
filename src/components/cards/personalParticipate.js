import { Button, Card } from 'react-bootstrap';
import styles from '@/styles/card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLock, faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import CountdownTimer from '@/components/countdownTimer';

function PersonalParticipate({ book, title, image, targetDate, creator, state, part, published, code} ) {

	const { t } = useTranslation();

	const redirectPage = () => {
		const redirectURL = published ? `/book/${book}/overview` : `/book/${book}`;
		window.location.href = redirectURL;
	};

	return (
		<Card className={styles.myEventCard} onClick={redirectPage}>
			<Card.Img 
				src={image} 
				className={styles.bookcard_personal_image}
			/>
			<Card.Title className='mx-3 mt-2 font-bold flex items-center'>
				{title}
				{ published ? <div className={styles.publishedText}>{t('Published')}</div> : <></> }
				
			</Card.Title>
			<Card.Body className='pt-0'>
				<Card.Text className='mr-2 flex flex-row fw-semibold text-green'>
					{t('Paragraph')} {part} |&nbsp;<CountdownTimer targetDate={targetDate}/>
				</Card.Text>
				<div className='mt-1 d-flex justify-between items-center'>
					<div className='text-sm text-brown'>
						{ (state === 'PUBLIC') ? <>
							<Card.Text className='flex items-center'>
								<FontAwesomeIcon icon={faEarthAmericas} className='mr-1'/>
								{t('Public')}
							</Card.Text>
						</> : 
						<>
							<Card.Text className='flex items-center my-1'>
								<FontAwesomeIcon icon={faLock} className='mr-1'/>
								{t('Private')} | { `${t('Code')}: ${code}`}
							</Card.Text>
						</>}
					</div>
					<Button style={{fontSize:'12px'}} variant={creator ? 'warning' : 'success'}>
						<p className='text'>{t('Settings')}
							<FontAwesomeIcon icon={ faArrowRight } className='ml-1'/>
						</p>
					</Button>
				</div>
			</Card.Body>
		</Card>
	)
}

export default PersonalParticipate;
