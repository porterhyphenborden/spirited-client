import React, { Component } from 'react';
import ValidationError from '../ValidationError';
import SpiritedApiService from '../../services/spirited-api-service';
import SpiritedContext from '../../SpiritedContext';

export default class AddIngredientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: '',
            ingredientValid: false,
            formValid: false,
            validationMessage: ''
        }
    }

    static defaultProps = {
        history: {
          push: () => { }
        },
    }

    static contextType = SpiritedContext;

    updateIngredient(ingredient) {
        this.setState({ingredient}, () => {this.validateIngredient(ingredient)});
    }

    validateIngredient(fieldValue) {
        let fieldError = this.state.validationMessage;
        const ingredientsList = this.props.ingredients;
        const ingredientsListLower = ingredientsList.map(ing => ing.name.toLowerCase());
        let hasError = false;
        fieldValue = fieldValue.trim().toLowerCase();
        const found = ingredientsListLower.some(ing => ing === fieldValue);
        
        if (fieldValue.length === 0) {
            fieldError = 'Ingredient name is required.';
            hasError = true;
        } else {
            if (found) {
                fieldError = 'That ingredient already exists!';
                hasError = true;
            } else {
                fieldError = '';
                hasError = false;
            }
        }
    
        this.setState({
            validationMessage: fieldError,
            ingredientValid: !hasError
        }, this.formValid );
    }

    formValid() {
        this.setState({
            formValid: this.state.ingredientValid,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const ingredient = this.state.ingredient;
        SpiritedApiService.postIngredient(ingredient)
            .then(res => {
                this.props.onAddIngredient(res)})
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        const ingredients = this.props.ingredients;
        return (
            <form className='add-ingredient' onSubmit={e => this.handleSubmit(e)}>
                <h2>Add a new ingredient</h2>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input name='name' id='name' type='text' list='ingredients' onChange={e => this.updateIngredient(e.target.value)}/>
                    <datalist id='ingredients'>
                        {ingredients.map(ingredient => 
                            <option value={ingredient.name} key={ingredient.id} />
                        )}
                    </datalist>
                    <ValidationError hasError={!this.state.ingredientValid} message={this.state.validationMessage}/>
                </div>
                <button type='submit' disabled={!this.state.formValid}>Add ingredient</button>
            </form>
        )
    }
}