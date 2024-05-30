import getConfig from 'next/config';
import { setCookie } from 'cookies-next';

const {
    publicRuntimeConfig: {
		frontendRoot, 
        accessTokenMaxAge,
        refreshTokenMaxAge
    }
} = getConfig();

const setToken = ({ userId, accessToken, refreshToken }) => {
	setCookie('user-id', userId);
	
	setCookie('access-token', accessToken, {
		maxAge: accessTokenMaxAge
	});

	setCookie('refresh-token', refreshToken, {
		maxAge: refreshTokenMaxAge
	});
};

function handleLogin() {
	const urlParams = new URLSearchParams(window.location.search);
	const userId = urlParams.get('user_id');
	const accessToken = urlParams.get('access_token');
	const refreshToken = urlParams.get('refresh_token');

	if (accessToken && refreshToken) {
		setToken({
			userId, 
			accessToken,
			refreshToken
		});
		
		const redirectURL = window.location.origin + window.location.pathname;
		window.location.replace(redirectURL);
	}
}

export default handleLogin;
