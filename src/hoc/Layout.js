import React, {Component} from 'react';
import MenuToggle from '../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../components/Navigation/Drawer/Drawer';
import {connect} from 'react-redux';

import classes from './Layout.module.css';

class Layout extends Component {
	state = {
		manu: false,
	};

	toggleMenuHandler = () => {
		this.setState(prevState => {
			return {
				menu: !prevState.menu,
			};
		});
	};

	menuCloseHandler = () => {
		this.setState(prevState => {
			return {
				menu: !prevState.menu,
			};
		});
	};

	render() {
		return (
			<div className={classes.Layout}>
				<Drawer
					isOpen={this.state.menu}
					onClose={this.menuCloseHandler}
					isAuthenticated={this.props.isAuthenticated}
				/>
				<MenuToggle
					onToggle={this.toggleMenuHandler}
					isOpen={this.state.menu}
				/>
				<main>{this.props.children}</main>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.auth.token,
	};
}

export default connect(mapStateToProps)(Layout);
