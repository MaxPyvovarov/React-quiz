import React from 'react';
import AnswersList from './AnswersList/AnswersList';

import classes from './ActiveQuiz.module.css';

const ActiveQuiz = props => {
	return (
		<div className={classes.ActiveQuiz}>
			<p className={classes.Question}>
				<span>
					<strong>{props.questionNumber}.</strong>&nbsp;{props.question}
				</span>
				<small>
					{props.questionNumber} из {props.quizLength}
				</small>
			</p>
			<AnswersList
				answers={props.answers}
				onAnswerClick={props.onAnswerClick}
				answerState={props.answerState}
			/>
		</div>
	);
};

export default ActiveQuiz;
