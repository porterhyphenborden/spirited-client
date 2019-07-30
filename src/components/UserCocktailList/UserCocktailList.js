import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SpiritedContext from '../../SpiritedContext';
import './UserCocktailList.css'

export default class UserCocktailList extends Component {

    static contextType = SpiritedContext;

    render() {
        const { userCocktails=[] } = this.context;
        return (
            <ul className='user-cocktail-list'>
                {userCocktails.map(cocktail =>
                    <li className='cocktail-result' key={cocktail.id}>
                        <h4>
                            <Link to={`/my-cocktails/${cocktail.id}`}>
                                {cocktail.name}
                            </Link>
                        </h4>
                        <p>{cocktail.description}</p>
                    </li>
                )}
            </ul>
        )
    }
}