import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SpiritedContext from '../../SpiritedContext'
import TokenService from '../../services/token-service'
import './Header.css'

export default class Header extends Component {
    
    static contextType = SpiritedContext;

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        this.context.setIsLoggedIn()
    }

    renderLogoutLink() {
        return (
            <div className='header-links'>
                <Link
                    onClick={this.handleLogoutClick}
                    to='/'>
                    Logout
                </Link>
            </div>
        )
    }
    
    renderLoginLink() {
        return (
            <div className='header-links'>
                <Link
                    to='/register'>
                    Register
                </Link>
                {' '}
                <Link
                    to='/login'>
                    Log in
                </Link>
            </div>
        )
    }

    render() {
        return (
            <nav className='header-nav'>
                <Link to='/'>
                    <h1>Spirited</h1>
                </Link>
                {(this.context.isLoggedIn)
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}
            </nav>
        )
    }
}