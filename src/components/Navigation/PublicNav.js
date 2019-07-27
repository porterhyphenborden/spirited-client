import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PublicNav extends Component {

    render() {
        return (
            <>
                <Link to='/cocktail-search'>
                    Search Cocktails
                </Link>
            </>
        )
    }
}