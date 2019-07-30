import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SpiritedContext from '../../SpiritedContext'
import './CocktailList.css'

export default class CocktailList extends Component {

    static contextType = SpiritedContext;

    render() {
        const { cocktails=[] } = this.context;
        return (
            <ul className='cocktail-results'>
                {cocktails.map(cocktail =>
                    <li className='cocktail-result' key={cocktail.id}>
                        <h4>
                            <Link to={`/cocktails/${cocktail.id}`}>
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