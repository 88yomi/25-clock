import './App.css';
import { useState, useRef, useEffect } from 'react';

import TimerSetter from './components/TimerSetter';
import ButtonsComp from './components/ButtonsComp';
import TimerLabel from './components/TimerLabel';

import sound from './beep.mp3';
import Footer from './components/Footer';

function App() {
	const [sessionLength, setSessionLength] = useState(25);
	const [breakLength, setBreakLength] = useState(5);

	const [time, setTime] = useState(sessionLength * 60 * 1000);
	const [breakTime, setBreakTime] = useState(breakLength * 60 * 1000);

	const [running, setRunning] = useState(false);

	const stopwatch = useRef(null);
	const breakElem = useRef(null);
	const beep = useRef(null);

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
		beep.current.pause();
		beep.current.currentTime = 0;
	}


	// play sound at 00:00
	useEffect(() => {
		if (document.getElementById("time-left").textContent === '00:00') {
			beep.current.play();
		}
	}, [time, breakTime])

	// timer end
	if (time < 0) {
		if (stopwatch.current && !breakElem.current) {
			setRunning(false);
			clearInterval(stopwatch.current);
			stopwatch.current = null;
			breakElem.current = setInterval(breakdown, 1000);
			// play audio
			beep.current.play();
		}
	}

	// break end
	if (breakTime < 0 && !stopwatch.current) {
		clearInterval(breakElem.current);
		breakElem.current = null;
		setTime(sessionLength * 60 * 1000)
		handleStartStop();
	}


	return (
		<>
			<main>
				<h1>25 + 5 Clock</h1>

				 <TimerLabel 
          breakElem={breakElem}
					time={time}
					breakTime={breakTime}
					running={running}
        />
				
				<TimerSetter
					sessionLength={sessionLength}
					breakLength={breakLength}
					running={running}
					setTime={setTime}
					setSessionLength={setSessionLength}
					setBreakLength={setBreakLength}
					setBreakTime={setBreakTime}
				/>

				<ButtonsComp
					running={running}
					handleStartStop={handleStartStop}
					handleReset={handleReset}
				/>
				<audio id="beep" src={sound} ref={beep} />
			</main>
			<Footer />
		</>
	);
}

export default App;
