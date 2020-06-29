import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quiz';
import './QuizList.css';

class QuizList extends Component {

	renderQuizes() {
		return this.props.quizes.map(quiz => {
			return (
				<li className="QuizList" key={ quiz.id }>
					<NavLink to={ '/quiz/' + quiz.id }>
						{ quiz.name }
					</NavLink>
				</li>
			)
		})
	}

	componentDidMount() {
		this.props.fetchQuizes();
	}

	render() {
		return (
			<div className="QuizList">
				<h1>Список тестів</h1>
				{
					this.props.loading && this.props.quizes.length !== 0 
					? <Loader />
					: <ul>
							{ this.renderQuizes() }
						</ul> 
				}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		quizes: state.quiz.quizes,
		loading: state.quiz.loading
	}
};

const mapDispatchToProps = dispatch => {
	return {
		fetchQuizes: () => dispatch(fetchQuizes())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);