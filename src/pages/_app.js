import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import zenMaruGothic from "@/utils/font";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
	typography: {
		allVariants: {
			fontFamily: 'zen-maru-gothic', 
			textTransform: 'none', 
		}
	}
});

function App({ Component, pageProps }) {
  	return (
		<ThemeProvider theme={theme}>
			<main className={zenMaruGothic.variable}>
				<Component {...pageProps} />
			</main>
		</ThemeProvider>
	);
}

export default App;
