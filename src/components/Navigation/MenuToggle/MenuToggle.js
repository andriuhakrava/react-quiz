import React from 'react';
import './MenuToggle.css';

const MenuToggle = props => {
	const classes = ['MenuToggle', 'fa'];

	if (props.isOpen) {
		classes.push('fa-times');
		classes.push('open');	
	}
	else {
		classes.push('fa-bars');	
	}

	return (
		<i className={ classes.join(' ') } onClick={ props.onToggle } />
	)
}

export default MenuToggle;