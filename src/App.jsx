import './App.css';
import { useState, useRef } from 'react';

import sound from './beep.mp3';

import Button from './components/Button';
import SetTime from './SetTime';
import Footer from './components/Footer';

function App() {
	const [sessionLength, setSessionLength] = useState(25);
	const [breakLength, setBreakLength] = useState(5);

	const [time, setTime] = useState(sessionLength * 60 * 1000);
	// const [time, setTime] = useState(5000);
	const [breakTime, setBreakTime] = useState(breakLength * 60 * 1000);

	const [running, setRunning] = useState(false);

	const stopwatch = useRef(null);
	const breakElem = useRef(null);
	const beep = useRef(null);

	let minutes = Math.floor(time / (60 * 1000));
	let seconds = (time / 1000) % 60;

	let breakMin = Math.floor(breakTime / (60 * 1000));
	let breakSec = (breakTime / 1000) % 60;

	const countdown = () => {
		setTime(prevState => prevState - 1000);
	}

	const breakdown = () => {
		setBreakTime(prevState => prevState - 1000);
	}

	const handleStartStop = () => {
		setRunning(!running);
		if (!running) {
			stopwatch.current = setInterval(countdown, 1000);
		}
		else {
			clearInterval(stopwatch.current)
		}
	}

	const handleReset = () => {
		setSessionLength(25);
		setBreakLength(5);
		setRunning(false);
		clearInterval(stopwatch.current);
		clearInterval(breakElem.current);
		// necessary?
		stopwatch.current = null;
		breakElem.current = null;
		setTime(25 * 60 * 1000);
		setBreakTime(5 * 60 * 1000);
		// reset audio to beginning
		beep.current.currentTime = null;
		// beep.current.currentTime = 0; // same thing
	}

	const handleCrement = (e) => {
		if (!running) {
			switch (e.target.name) {
				case "session-increment":
					if (sessionLength <= 59) {
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
					if (breakLength < 10) {
						setBreakLength(prevBreak => prevBreak + 1);
						setBreakTime(prevTime => prevTime + (1000 * 60));
					}
					break;
				default:
					return null;
			}
		}
	}

	// timer end
	if (minutes === 0 && seconds === 0) {
		if (stopwatch.current && !breakElem.current) {
			setRunning(false);
			clearInterval(stopwatch.current);
			stopwatch.current = null;
			breakElem.current = setInterval(breakdown, 1000);
			console.log("timer ended");
			// play audio
			beep.current.play();
		}
	}

	// break end
	if (breakTime <= 0 && !stopwatch.current) {
		clearInterval(breakElem.current);
		breakElem.current = null;
		setTime(sessionLength * 60 * 1000)
		handleStartStop();
		console.log("break ended")
	}

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

	return (
		<>
		<main>
			<h1>25 + 5 Clock</h1>

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
			
			<section className="set-timer">
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
			</section>


			<section className="buttons">
				<Button
					id="start_stop"
					text={running ? "Stop" : "Start"}
					handleClick={handleStartStop}
				/>

				<Button
					id="reset"
					text="reset"
					handleClick={handleReset}
				/>
			</section>
			<audio id="beep" src={sound} ref={beep} />
		</main>
		<Footer />
		</>
	);
}

export default App;
