import React, { Component } from 'react';
import './navbar.scss';

class NavBar extends Component {
    render() {
        return (
            <nav className="nav-bar">
                <div className="nav-icon home-icon">🏠</div>
                <div className="nav-icon create-icon">➕</div>
            </nav>
        );
    }
}

export default NavBar;