import React, { Component } from 'react';
import SpiritedApiService from '../../services/spirited-api-service'
import SpiritedContext from '../../SpiritedContext';

export default class CocktailPage extends Component {
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = SpiritedContext;

    componentDidMount() {
        const { cocktailId } = this.props.match.params;
        console.log(cocktailId)
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
            <section className='cocktail-recipe'>
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
            </section>
        )
    }
}