import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SvgIcon from '../svgicon/SvgIcon';
import './navbar.scss';


class NavBar extends Component {
    render() {
        return (
            <nav className="nav-bar">
                <div className="nav-bar__container">
                    <Link to="/" className="nav-icon active">
                        <SvgIcon id="#home" className="svg-nav-icon"/>
                    </Link>
                    <Link to="/create-post" className="nav-icon">
                        <SvgIcon id="#plus" className="svg-nav-icon"/>
                    </Link>
                </div>
                
                
            </nav>
        );
    }
}

export default NavBar;