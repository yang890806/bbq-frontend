import {Button ,Card, Image} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import styles from '@/styles/component-card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';



function Personal_participate({ title, image, targetDate, state, part, published, code} ) {

  const { t } = useTranslation();
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const timeDiff = new Date(targetDate) - now;

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeRemaining(
        `${days}d ${hours}h ${minutes}m `
      );

      if (timeDiff <= 0) {
        setTimeRemaining('The target time has arrived!');
      }
    };

    // Initial call to display the countdown immediately
    updateCountdown();
    
    // Update the countdown every second
    const interval = setInterval(updateCountdown, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [targetDate]);




  return (
    <div className={styles.bookcard_personal} >

        <div  className="d-flex justify-content-between align-items-center mb-2">
            <Card.Title className={` fw-bold fs-5 text-center ${styles.bookcard_cardtitle_person}`}  >{title}</Card.Title>
            <div style={{ display: 'flex'}}>
                <Card.Text className='fs-7'>
                    {published === 0
                        ? `${t('Code')}: ${code}`
                        : published === 1
                        ? "狀態: 公開"
                        : "代碼"
                    } 
                </Card.Text>
            </div>
        </div>

      <Card   onClick={() => window.location.href='/book/overview'} >

        <Card.Img 
          src={image} 
          className={styles.bookcard_personal_image}
        />

        

        <Card.Body style={{marginTop: -5 }}>
          <div  className="d-flex justify-content-between align-items-center">
            <div >
                <Card.Text className="mr-2 flex flex-row fw-semibold text-green" >{t('Paragraph')} {part}</Card.Text>
                <Card.Text className="mr-2 flex flex-row " >{timeRemaining}</Card.Text>
            </div>
            <Button style={{fontSize:"12px"}}className={state ? 'py-2 px-2': 'px-2 py-2'} variant={state ? 'success' : 'warning'} > {state ? <p className='text'>{t('Settings')} <FontAwesomeIcon icon={ faArrowRight } className='ml-1'/></p> : <p className='text'>{t('Settings')}<FontAwesomeIcon icon={ faArrowRight } className='ml-1'/></p>} </Button>
  
          </div>
        </Card.Body>

      </Card>

    </div>
  )
}

export default Personal_participate;