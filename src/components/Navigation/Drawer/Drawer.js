import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './Drawer.module.css';

const links = [
	{to: '/', label: 'Список', exact: true},
	{to: '/auth', label: 'Авторизация', exact: false},
	{to: '/quiz-creator', label: 'Создать тест', exact: false},
];

export default class Drawer extends Component {
	renderLinks = () => {
		return links.map((link, index) => {
			return (
				<li key={index}>
					<NavLink
						to={link.to}
						exact={link.exact}
						activeclassname={classes.active}
						onClick={this.props.onClose}
					>
						{link.label}
					</NavLink>
				</li>
			);
		});
	};

	render() {
		const cls = [classes.Drawer];
		if (!this.props.isOpen) {
			cls.push(classes.close);
		}

		return (
			<>
				<nav className={cls.join(' ')}>
					<ul>{this.renderLinks()}</ul>
				</nav>
				{this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
			</>
		);
	}
}
