import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './Drawer.module.css';

export default class Drawer extends Component {
	renderLinks = links => {
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

		console.log('Auth', this.props.isAuthenticated);

		const links = [{to: '/', label: 'Список', exact: true}];

		if (this.props.isAuthenticated) {
			links.push({to: '/quiz-creator', label: 'Создать тест', exact: false});
			links.push({to: '/logout', label: 'Выйти', exact: false});
		} else {
			links.push({to: '/auth', label: 'Авторизация', exact: false});
		}

		return (
			<>
				<nav className={cls.join(' ')}>
					<ul>{this.renderLinks(links)}</ul>
				</nav>
				{this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
			</>
		);
	}
}
