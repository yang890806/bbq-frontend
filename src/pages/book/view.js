import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import NavBar from '@/components/navbar';

function BookView() {

	const { t } = useTranslation();

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
		<Container>
		</Container>
		</>
	);
}

export default BookView;
