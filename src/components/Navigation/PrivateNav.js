import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PrivateNav extends Component {

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
            </>
        )
    }
}