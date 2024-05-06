import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import i18n from '@/utils/i18n';

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
		<Navbar>
			<Container>
				<Navbar.Brand href='/' bsPrefix='text-2xl no-underline' className='text-black font-bold'>
					BBQ
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav' className='flex justify-end mt-1 border-b-white'>
					<Nav className='me-auto' />
					<Nav>
						<Nav.Link href='/' className='text-black'>
							{ t('Home') }
						</Nav.Link>
						<Nav.Link className='text-black' onClick={handleLang}>
							<FontAwesomeIcon icon={faEarthAmericas} className='mr-2 flex flex-row' />
							中 | EN
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;
