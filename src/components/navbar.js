import getConfig from 'next/config';
import { forwardRef, useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import { Navbar, Nav, Container, Dropdown, DropdownItemText } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import i18n from '@/utils/i18n';
import getMyInfo from '@/auth/me';
import handleLogin from '@/auth/handleLogin';
import handleLogout from '@/auth/handleLogout';
import Avatar from '@/components/avatar';
import styles from '@/styles/navbar.module.css';
import BookSearch from '@/components/BookSearch';

const {
    publicRuntimeConfig: { frontendRoot, apiRoot }
} = getConfig();

function NavBar() {
	const { t } = useTranslation();
	const [url, setUrl] = useState(frontendRoot);
	const [lang, setLang] = useState(getCookie('lang') ?? 'en');
	const [user, setUser] = useState({});

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

	useEffect(() => {
		setUrl(window.location.href);
		initalLang();
		handleLogin();
		getUser();
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
						<BookSearch/>
						<Nav.Link href="/book/book_processing?status=finished" className="text-black hover:underline">
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
	);
}

export default NavBar;
