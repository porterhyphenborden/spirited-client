import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        this.setState({})
    }

    renderLogoutLink() {
        return (
            <div className='header-logged-in'>
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
            <div className='header-not-logged-in'>
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
            <nav className='header'>
                <h1>
                    <Link to='/'>
                        Spirited
                    </Link>
                </h1>
                {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}
            </nav>
        )
    }
}