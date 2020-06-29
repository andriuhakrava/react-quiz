import React from 'react';
import './Button.css';

const Button = props => {
	const classes = ['Button', `button-${props.type}`];
	return (
		<button onClick={ props.onClick } className={ classes.join(' ') } disabled={ props.disabled } >
			{ props.children }
		</button>
	);
}

export default Button;
