import { useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import i18n from '@/utils/i18n';
import styles from '@/styles/navbar.module.css';

function NavBar() {
	const { t } = useTranslation();
	const [lang, setLang] = useState(getCookie('lang') ?? 'en');

	const initalLang = () => {
		i18n.changeLanguage(lang);
	};

	const handleLang = () => {
		const newLang = (lang === 'en') ? 'zh' : 'en';
		setLang(newLang);
		setCookie('lang', newLang);
		i18n.changeLanguage(newLang);
	};

	useEffect(() => {
		initalLang();
	}, []);

	return (
		<Navbar  className={ styles.header } >
			<Container>
				<Navbar.Brand href="/book/home" bsPrefix="text-2xl no-underline" className="text-black font-bold">
					<span className='text-red'>B</span>
					<span className='text-yellow'>B</span>
					<span className='text-green'>Q</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav" className="flex justify-end mt-1 border-b-white">
					<Nav className="me-auto" />
					<Nav>
						<Nav.Link href="/book/home" className="text-black hover:underline">
							{ t('Home') }
						</Nav.Link>
						<Nav.Link href="/book/book_finished" className="text-black hover:underline">
							{ t('Books') }
						</Nav.Link>
						<Nav.Link href="/book/book_personal">
							<Button className={ styles.loginBtn }>
								{ t('Login') }
							</Button>
						</Nav.Link>
						<Nav.Link className="text-black hover:underline" onClick={ handleLang }>
							<FontAwesomeIcon icon={ faEarthAmericas } className="mr-2"/>
							中 | EN
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;
