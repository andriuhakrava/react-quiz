import React, { Component, Fragment } from 'react';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';
import './Drawer.css';

class Drawer extends Component {
	clickHandler = () => {
		this.props.onClose();
	}

	renderLinks(links) {
		return links.map((link, index) => {
			return (
				<li key={ index }>
					<NavLink to={ link.to } 
										exact={ link.exact } 
										activeClassName="active"
										onClick={ this.clickHandler }>
						{ link.label }
					</NavLink>
				</li>
			)
		})
	}

	render() {
		const classes = ['Drawer'];

		if (!this.props.isOpen) classes.push('close');

		const links = [
			{ to: '/', label: 'Список', exact: true }
		];

		if (this.props.isAuthenticated) {
			links.push({ to: '/quiz-creator', label: 'Створити тест', exact: false });
			links.push({ to: '/logout', label: 'Вийти', exact: false });
		} else {
			links.push({ to: '/auth', label: 'Авторизація', exact: false });
		}

		return (
			<Fragment>
				<nav className={ classes.join(' ') }>
					<ul>
						{ this.renderLinks(links) }
					</ul>
				</nav>
				{ this.props.isOpen ? <Backdrop onClick={ this.props.onClose } /> : null }
			</Fragment>
		)
	}
}

export default Drawer;