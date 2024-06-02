import {Card, Image} from 'react-bootstrap';
import styles from '@/styles/component-card.module.css';

function Cards({ title , content, image, author, profile }) {
  return (
    <Card  className={styles.bookcard} onClick={() => window.location.href='/book/overview'} >
      <Card.Img 
        variant="top" 
        src={image} 
        className={styles.bookcard_image}
        />
        

      <Card.Body>
        <div  className="d-flex justify-content-between align-items-center">
          <Card.Title className=' fw-bold fs-5'  >{title}</Card.Title>
          <div style={{ display: 'flex'}}>
            <Image src={profile} 
            roundedCircle 
            width='20' 
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