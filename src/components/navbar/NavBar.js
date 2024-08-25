import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SvgIcon from '../svgicon/SvgIcon';
import './navbar.scss';


class NavBar extends Component {
    render() {
        return (
            <nav className="nav-bar">
                <svg xmlns="http://www.w3.org/2000/svg" display={"none"}>
                    <symbol id="home" viewBox="0 0 24 24">
                        <path d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z" />
                        <path d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill="#1C274C"/>

                    </symbol>
                    <symbol id="plus">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.75 10.625H10.625V13.75C10.625 14.0938 10.3456 14.375 10 14.375C9.65438 14.375 9.375 14.0938 9.375 13.75V10.625H6.25C5.90438 10.625 5.625 10.3438 5.625 10C5.625 9.65625 5.90438 9.375 6.25 9.375H9.375V6.25C9.375 5.90625 9.65438 5.625 10 5.625C10.3456 5.625 10.625 5.90625 10.625 6.25V9.375H13.75C14.0956 9.375 14.375 9.65625 14.375 10C14.375 10.3438 14.0956 10.625 13.75 10.625ZM10 0C4.47688 0 0 4.475 0 10C0 15.525 4.47688 20 10 20C15.5231 20 20 15.525 20 10C20 4.475 15.5231 0 10 0Z" fill="#F4F7FF"/>

                    </symbol>
                </svg>
                <div className="nav-bar__container">
                    <NavLink to="/" className="nav-icon" activeClassName="nav-icon active">
                        <SvgIcon id="#home" className="svg-nav-icon"/>
                    </NavLink>
                    <NavLink to="/create-post" className="nav-icon" activeClassName="nav-icon active">
                        <SvgIcon id="#plus" className="svg-nav-icon"/>
                    </NavLink>
                </div>
                
                
            </nav>
        );
    }
}

export default NavBar;