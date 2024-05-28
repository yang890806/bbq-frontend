import { getCookie } from 'cookies-next';

function getMyInfo() {
	const accessToken = getCookie('access-token');
	const user = {'userId': '1', 'username': 'Deru', 'email': 'deru.yang0086@gmail.com', 'avatar': '/profile-2.jpeg'}
	if (accessToken === '12345') {
		console.log('user:', user);
		return user;
	}
	else {
		return {};
	}
}

export default getMyInfo;
