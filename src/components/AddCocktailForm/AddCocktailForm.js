import React, { Component } from 'react';
import SpiritedContext from '../../SpiritedContext';
import './AddCocktailForm.css'
import IngredientRow from '../IngredientRow/IngredientRow';
//import SpiritedApiService from '../../services/spirited-api-service';

export default class AddCocktailForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            ingredients: [],
        }
    }

    static contextType = SpiritedContext;

    updateIngredientName= (ingredientName, id) => {
        this.setState({ingredientName});
    }

    RenderIngredientsRows(count) {
        let rows = [];
        for (let i = 0; i < count; i++) {
            rows.push(<IngredientRow units={this.props.units} ingredients={this.props.ingredients} key={i} id={i+1} />)
        }
        return (
            <>
                {rows}
            </>
        )
    }

    AddIngredientsRow(event) {
        event.preventDefault();
        let count = this.state.count;
        count += 1;
        this.setState({
            count: count,
        })
    }

    render() {
        let count = this.state.count;
        let ingredients = this.RenderIngredientsRows(count);
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
                {ingredients}
                <button onClick={e => this.AddIngredientsRow(e)}>+</button>
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

