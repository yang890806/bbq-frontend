import {Card, Image} from 'react-bootstrap';
import styles from '@/styles/component-card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEye, faPlay } from '@fortawesome/free-solid-svg-icons';


function All_finished({ title, image, author, profile, viewer }) {
  return (
    <Card  className={styles.bookcard_allfinished} onClick={() => window.location.href='/book/overview'} >
      <Card.Title className=' fw-bold fs-4 text-center '  >{title}</Card.Title>
      <Card.Img 
        src={image} 
        className={styles.bookcard_allfinished_image}
      />
      <Card.Body style={{marginTop: -5 }}>
        <div  className="d-flex justify-content-between align-items-center">
          <div style={{ display: 'flex',marginLeft: '-13px' }} >
              <FontAwesomeIcon icon={faEye} className="mt-1 mr-2 flex flex-row text-red" />
              <Card.Text className="mr-2 flex flex-row " >{viewer}</Card.Text>
          </div>
          <div style={{ display: 'flex', marginRight: '-13px'}}>
            <Image src={profile} 
            roundedCircle 
            style={{ maxWidth: '30px', height: 'auto', objectFit: "scale-down" }}
            className='mr-2'
            />
            <Card.Text >{author}</Card.Text>
          </div>
        </div>
     </Card.Body>
    </Card>

  )
}

export default All_finished;
