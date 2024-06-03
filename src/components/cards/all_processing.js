import {Button ,Card, Image} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import styles from '@/styles/component-card.module.css';



function All_processing({ title, image, author, profile, targetDate, State, part} ) {

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
    <div className={styles.bookcard_allprocessing} >

      <div  className="d-flex justify-content-between align-items-center mb-2">
        <span className={styles.bookcard_span}>
          <Card.Title className={ `fw-bold ${ styles.bookcard_cardtitle}`}  >{title}</Card.Title>
        </span>
        <div style={{ display: 'flex'}}>
          <Image src={profile} 
          roundedCircle 
          style={{ width:"20px", objectFit: "scale-down" }}
          className='mr-2 '
          />
          <Card.Text >{author}</Card.Text>
        </div>
      </div>

      <Card   onClick={() => window.location.href='/book/overview'} >

        <Card.Img 
          src={image} 
          className={styles.bookcard_allprocessing_image}
        />

        <Card.Body style={{marginTop: -10 }}>
          <div  className="d-flex justify-content-between align-items-center">
            <div  >
               <Card.Text className="mr-2 flex flex-row fw-semibold text-green" >段落 {part}</Card.Text>
                <Card.Text className="mr-2 flex flex-row " >{timeRemaining}</Card.Text>
            </div>
            <Button style={{fontSize:"12px"}}className={State ? 'px-3 py-1': 'px-1 py-1'} variant={State ? 'success' : 'outline-success'} > {State ? <p> 我要投票!</p> : <p>接龍進行中...</p>} </Button>
          </div>
        </Card.Body>

      </Card>

    </div>
  )
}

export default All_processing;