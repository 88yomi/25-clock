import React from 'react'

const TimerLabel = ({ breakElem, time, breakTime, running }) => {
	const countDisplay = (mins, secs) => {
		return (
			<div className={running ? "timer-on" : null}>
				{`${mins.toString().length === 1
					? `0${mins}`
					: mins}:${secs.toString().length === 1
						? `0${secs}`
						: secs}`}
			</div>)
	}
	
	const minutes = Math.floor(time / (60 * 1000));
	const seconds = (time / 1000) % 60;

	const breakMin = Math.floor(breakTime / (60 * 1000));
	const breakSec = (breakTime / 1000) % 60;

	return (
		<section id="timer-label">
			{breakElem.current
				? "break"
				: "session"
			}
			<span id="time-left">
				{!breakElem.current
					? countDisplay(minutes, seconds)
					: countDisplay(breakMin, breakSec)
				}
			</span>
		</section>
	)
}

export default TimerLabel;