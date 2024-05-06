import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from '@mui/material';
import NavBar from '@/components/navbar';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function BookOverview() {

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
			<NavBar />
			<Container>
				<Row>
					<Col>
						<Button variant="contained" className="bg-yellow hover:bg-yellow">
							<FontAwesomeIcon icon={ faChevronLeft } className="mr-2 flex flex-row" />
							{ t('Back') }
						</Button>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default BookOverview;
