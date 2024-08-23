import React, { Component } from 'react';
import SvgIcon from '../svgicon/SvgIcon';
import './navbar.scss';


class NavBar extends Component {
    render() {
        return (
            <nav className="nav-bar">
                <div className="nav-bar__container">
                    <a href="{() => false}" className="nav-icon active">
                        <SvgIcon id="#home" className="svg-nav-icon"/>
                    </a>
                    <a href="{() => false}" className="nav-icon">
                        <SvgIcon id="#plus" className="svg-nav-icon"/>
                    </a>
                </div>
                
                
            </nav>
        );
    }
}

export default NavBar;