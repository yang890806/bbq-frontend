import { deleteCookie } from 'cookies-next';

const handleLogout = () => {
	deleteCookie('user-id');
	deleteCookie('access-token');
	deleteCookie('refresh-token');
};

export default handleLogout;
