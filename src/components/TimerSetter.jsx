import React from 'react';
import SetTime from './SetTime';

const SetTimer = ({ sessionLength, breakLength, running, setTime, setSessionLength, setBreakLength, setBreakTime }) => {
	const handleCrement = (e) => {
		if (!running) {
			switch (e.target.name) {
				case "session-increment":
					if (sessionLength < 60) {
						setTime(time => time + (1000 * 60));
						setSessionLength(length => length + 1);
					}
					break;
				case "session-decrement":
					if (sessionLength > 1) {
						setTime(time => time - (1000 * 60));
						setSessionLength(length => length - 1);
					}
					break;
				case "break-decrement":
					if (breakLength > 1) {
						setBreakLength(prevBreak => prevBreak - 1);
						setBreakTime(prevTime => prevTime - (1000 * 60));
					}
					break;
				case "break-increment":
					if (breakLength < 60) {
						setBreakLength(prevBreak => prevBreak + 1);
						setBreakTime(prevTime => prevTime + (1000 * 60));
					}
					break;
				default:
					return null;
			}
		}
	}

	return (
		<div className='set-timer'>
			<SetTime
				kind='session'
				length={sessionLength}
				handleCrement={handleCrement}
			/>

			<SetTime
				kind='break'
				length={breakLength}
				handleCrement={handleCrement}
			/>
		</div>
	)
}

export default SetTimer;