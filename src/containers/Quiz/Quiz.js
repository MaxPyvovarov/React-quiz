import React, {Component} from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

import classes from './Quiz.module.css';

export default class Quiz extends Component {
	state = {
		activeQuestion: 0,
		answerState: null,
		quiz: [
			{
				question: 'Какого цвета небо?',
				rightAnswerId: 2,
				answers: [
					{text: 'Черный', id: 1},
					{text: 'Синий', id: 2},
					{text: 'Красный', id: 3},
					{text: 'Зеленый', id: 4},
				],
			},
			{
				question: 'В каком году основали г.Харьков?',
				rightAnswerId: 4,
				answers: [
					{text: '1660', id: 1},
					{text: '1656', id: 2},
					{text: '1650', id: 3},
					{text: '1654', id: 4},
				],
			},
		],
	};

	onAnswerClickHandler = (answerId) => {
		if (this.state.answerState) {
			const key = Object.keys(this.state.answerState)[0];
			if (this.state.answerState[key] === 'success') {
				return;
			}
		}

		const question = this.state.quiz[this.state.activeQuestion];

		if (question.rightAnswerId === answerId) {
			this.setState((prevState) => {
				return {
					answerState: {[answerId]: 'success'},
				};
			});

			const timeout = setTimeout(() => {
				if (this.isQuizFinished()) {
					console.log('Finished');
				} else {
					this.setState((prevState) => {
						return {
							activeQuestion: prevState.activeQuestion + 1,
							answerState: null,
						};
					});
				}

				clearTimeout(timeout);
			}, 500);
		} else {
			this.setState((prevState) => {
				return {
					answerState: {[answerId]: 'error'},
				};
			});
		}
	};

	isQuizFinished = () => {
		return this.state.activeQuestion + 1 === this.state.quiz.length;
	};

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Answer all they</h1>
					<ActiveQuiz
						answers={this.state.quiz[this.state.activeQuestion].answers}
						question={this.state.quiz[this.state.activeQuestion].question}
						onAnswerClick={this.onAnswerClickHandler}
						quizLength={this.state.quiz.length}
						questionNumber={this.state.activeQuestion + 1}
						answerState={this.state.answerState}
					/>
				</div>
			</div>
		);
	}
}
