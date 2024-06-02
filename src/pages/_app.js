import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import getConfig from 'next/config';
import { getCookie, setCookie } from "cookies-next";
import Swal from "sweetalert2";
import handleLogout from '@/auth/handleLogout';
import axios from '@/utils/axios';
import zenMaruGothic from "@/utils/font";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
	typography: {
		allVariants: {
			fontFamily: zenMaruGothic.style.fontFamily, 
			textTransform: 'none', 
		}
	}
});

const {
    publicRuntimeConfig: {
        accessTokenMaxAge,
        refreshTokenMaxAge
    },
} = getConfig();

const App = ({ Component, pageProps }) => {

	const refreshAccessToken = async(refreshToken, userId) => {
		const params = { userId, refreshToken };
		const { status, data } = await axios.post('/token/refresh', params, {});

		if (status === 200) {
			setCookie('access-token', data?.accessToken, { maxAge: accessTokenMaxAge });
			if (refreshToken !== data?.refreshToken) {
				setCookie('refresh-token', data?.refreshToken, { maxAge: refreshTokenMaxAge });
			}
		}
	};

	// 定期更換access token
	setInterval(async() => {
		const userId = getCookie('user-id');
		const refreshToken = getCookie('refresh-token');

		if (refreshToken) {
			refreshAccessToken(refreshToken, userId);
		}
	}, accessTokenMaxAge * 500);

	return (
		<ThemeProvider theme={theme}>
			<main className={zenMaruGothic.variable}>
				<Component {...pageProps} />
			</main>
		</ThemeProvider>
	);
};

export default App;
