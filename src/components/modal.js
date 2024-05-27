import { Container, Row, Col } from 'react-bootstrap';
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import zenMaruGothic from '@/utils/font';

const useStyles = makeStyles({
	modal: {
		fontFamily: zenMaruGothic.style.fontFamily, 
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		boxShadow: 24,
		width: '40vw',
		padding: '15px 30px',
		backgroundColor: '#FCFBF7',
		color: 'black',
		outline: 0,
		borderRadius: '5px',
	}
});

function BaseModal(props) {

	const modalStyles = useStyles();

	return props.show && (
		<Modal 
			open={props.show}
			onClose={props.handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Container className={`${modalStyles.modal} ${props.className}`}>
				<Row>
					<Col className='text-end text-3xl text-green font-bold'>
						<button className='hover:rotate-12' onClick={props.handleClose}>&times;</button>
					</Col>
				</Row>
				{props.children}
			</Container>
		</Modal>
	);
}

export default BaseModal;
