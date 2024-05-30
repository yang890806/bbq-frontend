import getConfig from 'next/config';
import { forwardRef, useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import { Row, Col, Navbar, Nav, Container, Dropdown, DropdownItemText } from 'react-bootstrap';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import i18n from '@/utils/i18n';
import getMyInfo from '@/auth/me';
import handleLogin from '@/auth/handleLogin';
import handleLogout from '@/auth/handleLogout';
import Avatar from '@/components/avatar';
import BaseModal from '@/components/modal';
import styles from '@/styles/navbar.module.css';

const {
    publicRuntimeConfig: { frontendRoot, apiRoot }
} = getConfig();

function NavBar() {
	const { t } = useTranslation();
	const [url, setUrl] = useState(frontendRoot);
	const [lang, setLang] = useState(getCookie('lang') ?? 'en');
	const [user, setUser] = useState({});
	const [showJoinModal, setShowJoinModal] = useState(false);
	const [eventCode, setEventCode] = useState('');

	const initalLang = () => {
		i18n.changeLanguage(lang);
	};

	const handleLang = () => {
		const newLang = (lang === 'en') ? 'zh' : 'en';
		setLang(newLang);
		setCookie('lang', newLang);
		i18n.changeLanguage(newLang);
	};

	const getUser = async() => {
		const info = await getMyInfo();
		setUser(info);
	};

	const userMenu = forwardRef(({ children, onClick }, ref) => {
		return (
			<div 
				ref={ref} 
				onClick={(e) => {
					e.preventDefault();
					onClick(e);
				}}
				className='cursor-pointer'
			>
				{children}
			</div>
		);
	});

	// 登出
	const logout = () => {
		handleLogout();
		getUser();
	};

	// 加入活動
	const joinEvent = () => {
		console.log('eventCode:', eventCode);
	};

	useEffect(() => {
		setUrl(window.location.href);
		initalLang();
		handleLogin();
		getUser();
	}, []);

	return (
		<>
		<Navbar className='shadow-md'>
			<Container>
				<Navbar.Brand href="/" bsPrefix="text-2xl no-underline" className="text-black font-bold">
					<span className='text-red'>B</span>
					<span className='text-yellow'>B</span>
					<span className='text-green'>Q</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav" className="flex justify-end mt-1 border-b-white">
					<Nav className="me-auto" />
					<Nav>
						<Nav.Link href="/" className="text-black hover:underline">
							{ t('Home') }
						</Nav.Link>
						<Nav.Link href="/" className="text-black hover:underline">
							{ t('Books') }
						</Nav.Link>
						{user?.uId ? (
							<Dropdown className='flex justify-center items-center mx-2'>
								<Dropdown.Toggle as={userMenu}>
									<Avatar 
										avatar={user?.avatar} 
										username={user?.username} 
										width={35}
										height={35}
										className='hover:scale-95'
									/>
								</Dropdown.Toggle>
								<Dropdown.Menu className='text-center'>
									<DropdownItemText>Hello, {user?.username}!</DropdownItemText>
									<Dropdown.Item className='hover:bg-light-yellow focus:bg-yellow' href='/'>{t('My Events')}</Dropdown.Item>
									<Dropdown.Item className='hover:bg-light-green focus:bg-green' onClick={() => setShowJoinModal(true)}>{t('Join Event')}</Dropdown.Item>
									<Dropdown.Item className='hover:bg-light-red focus:bg-red' onClick={logout}>{t('Logout')}</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						) : (
							<Nav.Link href={`${apiRoot}/auth/google/login?client_url=${url}`}>
								<div className={ styles.loginBtn }>{ t('Login') }</div>
							</Nav.Link>
						)}
						<Nav.Link className="text-black hover:underline" onClick={ handleLang }>
							<FontAwesomeIcon icon={ faEarthAmericas } className="mr-2"/>
							中 | EN
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		{showJoinModal && (
			<BaseModal className='text-md text-center' show={showJoinModal} handleClose={() => setShowJoinModal(false)} style={{width: '30vw'}}>
				<Row>
					<Col>
						<h1 className='text-3xl font-bold'>{t('Join Event')}</h1>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className='my-6'>
							<input 
								id='eventCode' 
								type='text' 
								className={styles.codeInput}
								placeholder={`${t('Enter event code')}`}
								value={eventCode}
								onChange={(e) => setEventCode(e.target.value)}
							/>
						</div>
						<Button className={styles.confirmBtn} onClick={joinEvent}>{ t('Confirm') }</Button>
					</Col>
				</Row>
			</BaseModal>
		)}
		</>
	);
}

export default NavBar;
