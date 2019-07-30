import React, { Component } from 'react';
import './LandingPage.css'
// import { Link } from 'react-router-dom';

export default class LandingPage extends Component {

    render() {
        return (
            <div className='welcome'>
                <h2>Welcome to Spirited!</h2>
                <p>Spirited is a tool for the modern bartender and craft cocktail enthusiast. Search our curated selection of cocktail recipes, including both classics and modern favorites. Register for an account to create a personal cocktail library, add your own recipes, and update those recipes as you make changes.</p>
            </div>
        )
    }
}