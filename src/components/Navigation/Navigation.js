import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SpiritedContext from '../../SpiritedContext'
import './Navigation.css'

export default class Navigation extends Component {

    static contextType = SpiritedContext;

    renderNavLoggedIn() {
        return (
            <>
                <Link to='/my-cocktails'>
                    My Cocktails
                </Link>
                <Link to='/cocktail-search'>
                    Search Cocktails
                </Link>
                <Link to='/add-cocktail'>
                    Add New Cocktail
                </Link>
            </>
        )
    }

    renderNavLoggedOut() {
        return (
            <>
                <Link to='/cocktail-search'>
                    Search Cocktails
                </Link>
            </>
        )
    }

    render() {
        return (
            <>
                {(this.context.isLoggedIn)
                    ? this.renderNavLoggedIn()
                    : this.renderNavLoggedOut()}
            </>
        )
    }
}