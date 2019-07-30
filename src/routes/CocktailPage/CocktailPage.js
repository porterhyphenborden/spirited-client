import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SpiritedApiService from '../../services/spirited-api-service'
import SpiritedContext from '../../SpiritedContext'
import './CocktailPage.css'

export default class CocktailPage extends Component {
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = SpiritedContext

    componentDidMount() {
        const { cocktailId } = this.props.match.params;
        SpiritedApiService.getCocktail(cocktailId)
            .then((cocktail) => {
                this.context.setCurrentCocktail(cocktail)
            })
            .catch(error => {
                console.error({ error })
            })
        SpiritedApiService.getIndredientsForCocktail(cocktailId)
            .then((ingredients) => {
                this.context.setCurrentCocktailIng(ingredients)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        const cocktail = this.context.currentCocktail;
        const ingredients = this.context.cocktailIngredients;
        return (
            <div className='cocktail-recipe'>
                <h3>{cocktail.name}</h3>
                <p>{cocktail.description}</p>
                {cocktail.created_by && 
                    <p>Credit: {cocktail.created_by}</p>}
                <ul className='ingredient-list'>
                    {ingredients.map(ingredient => 
                        <li key={ingredient.id}>
                            {ingredient.quantity} {ingredient.unit} {ingredient.name}
                        </li>
                    )}
                </ul>
                <p>Instructions: {cocktail.instructions}</p>
                {cocktail.garnish &&
                    <p>Garnish: {cocktail.garnish}</p>}
                {cocktail.glass &&
                    <p>Glass: {cocktail.glass}</p>}
                {cocktail.notes && 
                    <p>Notes: {cocktail.notes}</p>}
                {cocktail.ing_instructions &&
                    <p>Ingredient Instructions: {cocktail.ing_instructions}</p>}
                {cocktail.user_id && <Link to={`/my-cocktails/${cocktail.id}/update`}>
                    Update Cocktail
                </Link>}
            </div>
        )
    }
}