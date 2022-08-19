import React, {Component} from 'react';
import MenuToggle from '../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../components/Navigation/Drawer/Drawer';

import classes from './Layout.module.css';

export default class Layout extends Component {
	state = {
		manu: false,
	};

	toggleMenuHandler = () => {
		this.setState((prevState) => {
			return {
				menu: !prevState.menu,
			};
		});
	};

	menuCloseHandler = () => {
		this.setState((prevState) => {
			return {
				menu: !prevState.menu,
			};
		});
	};

	render() {
		return (
			<div className={classes.Layout}>
				<Drawer isOpen={this.state.menu} onClose={this.menuCloseHandler} />
				<MenuToggle
					onToggle={this.toggleMenuHandler}
					isOpen={this.state.menu}
				/>
				<main>{this.props.children}</main>
			</div>
		);
	}
}
