import React, { Component } from 'react';
import SvgIcon from '../svgicon/SvgIcon';
import './navbar.scss';


class NavBar extends Component {
    render() {
        return (
            <nav className="nav-bar">
                <a href="#" className="nav-icon">
                    <SvgIcon id="#home" className="svg-nav-icon"/>
                </a>
                <a href="" className="nav-icon">
                    <SvgIcon id="#plus" className="svg-nav-icon"/>
                </a>
            </nav>
        );
    }
}

export default NavBar;