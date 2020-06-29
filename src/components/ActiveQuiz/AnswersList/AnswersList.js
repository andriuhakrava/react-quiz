import React from 'react';
import AnswerItem from './AnswerItem/AnswerItem';
import './AnswersList.css';

const AnswersList = props => (
	<ul className="AnswersList">
		{props.answers.map((answer, index) => {
			return (
				<AnswerItem key={ index } 
										answer={ answer } 
										onAnswerClick={ props.onAnswerClick }
										state={ props.state ? props.state[answer.id] : null } />
			)
		})}
	</ul>
);

export default AnswersList;
