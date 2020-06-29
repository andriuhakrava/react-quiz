import React, { Component, Fragment } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Select from '../../components/UI/Select/Select';
import { createControl, validate, validateForm} from '../../form/FormFramework.js';
import { connect } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create';
import './QuizCreator.css';

function createOptionControl(number) {
	return createControl({
		label: `Варіант ${number}`,
		errorMessage: 'Питання не може бути порожнім',
		id: number
	}, { required: true });
}

function createFormControls() {
	return {
		question: createControl({
			label: 'Введіть питання',
			errorMessage: 'Поле не може бути порожнім'
		}, { required: true }),
		option1: createOptionControl(1),
		option2: createOptionControl(2),
		option3: createOptionControl(3),
		option4: createOptionControl(4)
	}
}

class QuizCreator extends Component {
	state = {
		isFormValid: false,
		rightAnswerId: 1,
		formControls: createFormControls()
	}

	formHandler = e => e.preventDefault();

	addQuestionHandler = e => {
		e.preventDefault();
		const { question, option1, option2, option3, option4 } = this.state.formControls;
		const questionItem = {
			question: question.value,
			id: this.props.quiz.length + 1,
			rightAnswerId: this.state.rightAnswerId,
			answers: [
				{ text: option1.value, id: option1.id },
				{ text: option2.value, id: option2.id },
				{ text: option3.value, id: option3.id },
				{ text: option4.value, id: option4.id },
			]
		};
		this.props.createQuizQestion(questionItem);
		this.setState({
			isFormValid: false,
			rightAnswerId: 1,
			formControls: createFormControls()
		})
	}

	createQuizHandler = e => {
		e.preventDefault();
		
		this.setState({
			isFormValid: false,
			rightAnswerId: 1,
			formControls: createFormControls()
		});
		this.props.finishCreateQuiz();
	}

	changeHandler = (value, controlName) => {
		const formControls = {...this.state.formControls};
		const control = {...formControls[controlName]};
		control.touched = true;
		control.value = value;
		control.valid = validate(control.value, control.validation);
		formControls[controlName] = control;
		this.setState({
			formControls,
			isFormValid: validateForm(formControls)
		})
	}

	selectChangeHandler = event => {
		this.setState({
			rightAnswerId: +event.target.value
		})
	}

	renderControls = () => {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName];
			return (
				<Fragment key={ controlName + index }>
					<Input  
									label={ control.label }
									value={ control.value }
									valid={ control.valid }
									shouldValidate={ !!control.validation }
									touched={ control.touched }
									errorMessage={ control.errorMessage }
									onChange={ e => this.changeHandler(e.target.value, controlName) } />
					{ index === 0 ? <hr /> : null }
				</Fragment>
			)
		});
	}
	
	render() {
		const select = 
			<Select label="Оберіть правильну відповідь"
							value={ this.state.rightAnswerId }
							onChange={ this.selectChangeHandler }
							options={ [
								{ text: 1, value: 1 },
								{ text: 2, value: 2 },
								{ text: 3, value: 3 },
								{ text: 4, value: 4 }
							]} />
		return (
			<div className="QuizCreator">
				<div>
					<h1>Створення тесту</h1>
					<form onSubmit={ this.formHandler }>
						{ this.renderControls() }
						{ select }
						<Button type="primary" 
										onClick={ this.addQuestionHandler }
										disabled={ !this.state.isFormValid }>
							Додати питання
						</Button>
						<Button type="success" 
										onClick={ this.createQuizHandler }
										disabled={ this.props.quiz.length === 0 }>
							Створити тест
						</Button>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		quiz: state.create.quiz
	}
};

const mapDispatchToProps = dispatch => {
	return {
		createQuizQestion: item => dispatch(createQuizQuestion(item)),
		finishCreateQuiz: () => dispatch(finishCreateQuiz())
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);