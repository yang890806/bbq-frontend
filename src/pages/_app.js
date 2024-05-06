import "@/styles/globals.css";
import zenMaruGothic from "@/utils/font";

function App({ Component, pageProps }) {
  	return (
		<main className={zenMaruGothic.className}>
			<Component {...pageProps} />
		</main>
	);
}

export default App;
