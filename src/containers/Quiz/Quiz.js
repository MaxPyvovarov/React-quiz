import React, {Component} from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/axios-quiz';

import classes from './Quiz.module.css';
import Loader from '../../components/UI/Loader/Loader';

export default class Quiz extends Component {
	state = {
		results: {},
		isFinished: false,
		activeQuestion: 0,
		state: null,
		quiz: [],
		loading: true,
	};

	onAnswerClickHandler = answerId => {
		if (this.state.state) {
			const key = Object.keys(this.state.state)[0];
			if (this.state.state[key] === 'success') {
				return;
			}
		}

		const question = this.state.quiz[this.state.activeQuestion];
		const results = this.state.results;

		if (question.rightAnswerId === answerId.number) {
			if (!results[question.id]) {
				results[question.id] = 'success';
			}

			this.setState({
				state: {[answerId.number]: 'success'},
				results,
			});

			const timeout = window.setTimeout(() => {
				if (this.isQuizFinished()) {
					this.setState({
						isFinished: true,
					});
				} else {
					this.setState({
						activeQuestion: this.state.activeQuestion + 1,
						state: null,
					});
				}
				window.clearTimeout(timeout);
			}, 1000);
		} else {
			results[question.id] = 'error';
			this.setState({
				state: {[answerId.number]: 'error'},
				results,
			});
		}
	};

	isQuizFinished = () => {
		return this.state.activeQuestion + 1 === this.state.quiz.length;
	};

	onRetryHandler = () => {
		this.setState({
			activeQuestion: 0,
			state: null,
			isFinished: false,
			results: {},
		});
	};

	async componentDidMount() {
		try {
			const response = await axios.get(
				`/quizes/${this.props.match.params.id}.json`
			);
			const quiz = response.data;
			this.setState({quiz, loading: false});
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Ответьте на все вопросы</h1>

					{this.state.loading ? (
						<Loader />
					) : this.state.isFinished ? (
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
							state={this.state.state}
						/>
					)}
				</div>
			</div>
		);
	}
}
