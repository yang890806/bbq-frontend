import { useState, useEffect } from 'react';
import {Card, Image, Button} from 'react-bootstrap';
import styles from '@/styles/card.module.css';

function Processing({ title , content, image, Stage, targetDate  }) {

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
        `${days}d ${hours}h ${minutes}m ${seconds}s`
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
    <Card  className={styles.bookcard} onClick={() => window.location.href='/book/overview'} >
      <Card.Img 
        variant="top" 
        src={image} 
        className={styles.card_image}
        />
      
      <Card.Body>
        <div  className="d-flex justify-content-between align-items-center">
          
            <Card.Title className=' fw-bold fs-4'  >{title}</Card.Title>
  
          <div className='d-flex justify-content-center align-items-center '>
            <Card.Text id="countdown" className=' fw-bold fs-5 text-green'  > {timeRemaining} </Card.Text>
          </div>
        </div>
        <div  className="d-flex justify-content-between align-items-center">

          <Card.Text style={{ width: '230px' }} className={`my-1  ${styles.text_truncate_multiline}`} >{content}</Card.Text>
          <Button className='px-4 py-3 fs-6' variant={Stage ? 'success' : 'outline-success'} > {Stage ? <p> 我要投票!</p> : <p>接龍進行中...</p>} </Button>

        </div>
      </Card.Body>
    </Card>

  );
}

export default Processing;