import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {

    render() {
        return (
            <>
                <Link to='/cocktail-search'>
                    Search Cocktails
                </Link>
                {' '}
                <Link to='/add-cocktail'>
                    Add New Cocktail
                </Link>
                {' '}
                <Link to='/register'>
                    Register
                </Link>
                {' '}
                <Link to='/login'>
                    Login
                </Link>
            </>
        )
    }
}