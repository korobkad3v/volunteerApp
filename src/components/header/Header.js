import React, { Component } from 'react';
import './header.scss';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <h1>Logo</h1>
                <div>search</div>
            </header>
        );
    }
}

export default Header;