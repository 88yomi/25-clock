import React from 'react';

function Button({ text, handleClick, id }) {
	return (
		<button
			onClick={handleClick}
			id={id}
		>
			{text}
		</button>
	)
}

export default Button;