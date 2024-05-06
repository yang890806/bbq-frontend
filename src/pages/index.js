import Head from "next/head";
import NavBar from "@/components/navbar";

export default function Home() {
	return (
		<>
		<Head>
			<title>BBQ</title>
			<meta
				property="og:description"
				content="BBQ - BoundlessBrushQuill"
			/>
		</Head>
		<NavBar/>
		</>
	);
}
