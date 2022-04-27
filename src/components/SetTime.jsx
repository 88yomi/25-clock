import React from 'react'

function SetTime({ kind, length, handleCrement }) {
	return (
		<div id={kind}>
			<div id={`${kind}-label`}>
				{`${kind} length`}
			</div>
			<div id={`${kind}-length`}>
				{length}
			</div>
			<button
				id={`${kind}-increment`}
				name={`${kind}-increment`}
				onClick={handleCrement}
			>
				▲
			</button>
			<button
				id={`${kind}-decrement`}
				name={`${kind}-decrement`}
				onClick={handleCrement}
			>
				▼
			</button>
		</div>
	)
}

export default SetTime;