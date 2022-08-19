import React, {Component} from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

import classes from './Quiz.module.css';

export default class Quiz extends Component {
	state = {
		results: {}, // { [id]: 'success' 'error'}
		isFinished: false,
		activeQuestion: 0,
		answerState: null, // { [id]: 'success' 'error'}
		quiz: [
			{
				question: 'Какого цвета небо?',
				rightAnswerId: 2,
				id: 1,
				answers: [
					{text: 'Черный', id: 1},
					{text: 'Синий', id: 2},
					{text: 'Красный', id: 3},
					{text: 'Зеленый', id: 4},
				],
			},
			{
				question: 'Какого цвета трава?',
				rightAnswerId: 1,
				id: 3,
				answers: [
					{text: 'Зеленый', id: 1},
					{text: 'Синий', id: 2},
					{text: 'Красный', id: 3},
					{text: 'Черный', id: 4},
				],
			},
			{
				question: 'В каком году основали г.Харьков?',
				rightAnswerId: 4,
				id: 2,
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
		const results = this.state.results;

		if (question.rightAnswerId === answerId) {
			if (!results[question.id]) {
				results[question.id] = 'success';
			}
			this.setState((prevState) => {
				return {
					answerState: {[answerId]: 'success'},
					results,
				};
			});

			const timeout = setTimeout(() => {
				if (this.isQuizFinished()) {
					this.setState((prevState) => {
						return {
							isFinished: true,
						};
					});
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
			results[question.id] = 'error';
			this.setState((prevState) => {
				return {
					answerState: {[answerId]: 'error'},
					results,
				};
			});
		}
	};

	isQuizFinished = () => {
		return this.state.activeQuestion + 1 === this.state.quiz.length;
	};

	onRetryHandler = () => {
		this.setState((prevState) => {
			return {
				activeQuestion: 0,
				answerState: null,
				isFinished: false,
				results: {},
			};
		});
	};

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Ответьте на все вопросы</h1>

					{this.state.isFinished ? (
						<FinishedQuiz
							results={this.state.results}
							quiz={this.state.quiz}
							onRetry={this.onRetryHandler}
						/>
					) : (
						<ActiveQuiz
							answers={this.state.quiz[this.state.activeQuestion].answers}
							question={this.state.quiz[this.state.activeQuestion].question}
							onAnswerClick={this.onAnswerClickHandler}
							quizLength={this.state.quiz.length}
							questionNumber={this.state.activeQuestion + 1}
							answerState={this.state.answerState}
						/>
					)}
				</div>
			</div>
		);
	}
}
