import React, { Component } from 'react';
import SpiritedContext from '../../SpiritedContext';
//import SpiritedApiService from '../../services/spirited-api-service';

export default class AddCocktailForm extends Component {

    static contextType = SpiritedContext;

    RenderIngredients() {
        const { units, ingredients } = this.props;
        return (
            <div className='ingredient-form-group'>
                <div className='form-group'>
                    <label htmlFor='amount'>Amount</label>
                    <input name='amount' id='amount' type='text' />
                </div>
                <div className='form-group'>
                    <label htmlFor='unit'>Unit</label>
                    <input name='unit' id='unit' list='units' />
                    <datalist id='units'>
                        {units.map(unit => 
                            <option value={unit.unit_name} key={unit.id} />
                        )}
                    </datalist>
                </div>
                <div className='form-group'>
                    <label htmlFor='ingredient'>Ingredient</label>
                    <input name='ingredient' id='ingredient' list='ingredients' />
                    <datalist id='ingredients'>
                        {ingredients.map(ingredient => 
                            <option value={ingredient.name} key={ingredient.id} />
                        )}
                    </datalist>
                </div>
            </div>
        )
    }

    render() {

        return (
            <form className='add-cocktail'>
                <h2>Add a new cocktail</h2>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input name='name' id='name' type='text' />
                </div>
                <div className='form-group'>
                    <label htmlFor='description'>Description</label>
                    <input name='description' id='description' type='text' />
                </div>
                <div className='form-group'>
                    <label htmlFor='credit'>Created by</label>
                    <input name='credit' id='credit' type='text' />
                </div>
                {this.RenderIngredients()}
                <div className='form-group'>
                    <label htmlFor='instructions'>Instructions</label>
                    <textarea name='instructions' id='instructions' />
                </div>
                <div className='form-group'>
                    <label htmlFor='garnish'>Garnish</label>
                    <input name='garnish' id='garnish' type='text' />
                </div>
                <div className='form-group'>
                    <label htmlFor='glass'>Glass</label>
                    <input name='glass' id='glass' type='text' />
                </div>
                <div className='form-group'>
                    <label htmlFor='notes'>Notes</label>
                    <textarea name='notes' id='notes' placeholder='Rye whiskey is recommended.'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='ingredient-instructions'>Instructions for ingredients</label>
                    <textarea name='ingredient-instructions' id='ingredient-instructions' placeholder='For thyme simple, mix 4 sprigs thyme, 1 cup sugar...'/>
                </div>
                <button type='submit'>Add cocktail</button>
            </form>
        )
    }
}

