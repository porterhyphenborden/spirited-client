import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SpiritedContext from '../../SpiritedContext'
import TokenService from '../../services/token-service'
import './Header.css'
import logo from '../../images/spiritedlogo.png'

export default class Header extends Component {
    
    static contextType = SpiritedContext

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        this.context.setIsLoggedIn()
    }

    renderLogoutLink() {
        return (
            <div className='header-links logged-in'>
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
            <div className='header-links logged-out'>
                <Link
                    to='/register'>
                    Register
                </Link>
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
                <Link className='logo' to='/'>
                    <img className='logo' src={logo} alt='Spirited' />
                </Link>
                {(this.context.isLoggedIn)
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}
            </nav>
        )
    }
}