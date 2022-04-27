import React from 'react'
import Button from './Button'

const ButtonsComp = ({running, handleStartStop, handleReset}) => {
	return (
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
	)
}

export default ButtonsComp