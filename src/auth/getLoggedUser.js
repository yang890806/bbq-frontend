import { getCookie } from 'cookies-next';

function getLoggedUser() {

	const user = getCookie('user-id');
	if (!user) {
		return null;
	}
	
	return parseInt(user, 10);
}

export default getLoggedUser;
