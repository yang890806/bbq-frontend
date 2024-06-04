import React, { useState, useEffect } from 'react';

function CountdownTimer({ targetDate }) {
	const [timeRemaining, setTimeRemaining] = useState('');

	useEffect(() => {
		
		const updateCountdown = () => {
			const now = new Date();
			const timeDiff = new Date(targetDate) - now;

			const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

			setTimeRemaining(
				`${days}d ${hours}h ${minutes}m ${seconds}s`
			);

			if (timeDiff <= 0) {
				setTimeRemaining('0d 0h 0m 0s')
			}
		};

		// Initial call to display the countdown immediately
		updateCountdown();
		
		// Update the countdown every second
		const interval = setInterval(updateCountdown, 1000);

		// Clean up the interval on component unmount
		return () => clearInterval(interval);
	}, [targetDate]);

	return <span>{timeRemaining}</span>;
}

export default CountdownTimer;
