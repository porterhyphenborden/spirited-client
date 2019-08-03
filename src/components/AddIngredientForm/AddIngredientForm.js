import React, { Component } from 'react';
import ValidationError from '../ValidationError';
import SpiritedApiService from '../../services/spirited-api-service';
import SpiritedContext from '../../SpiritedContext';
import './AddIngredientForm.css'

export default class AddIngredientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
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
        ingredients: [],
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
        }, this.formValid )
    }

    formValid() {
        this.setState({
            formValid: this.state.ingredientValid,
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const ingredient = this.state.ingredient
        const { name } = event.target
        SpiritedApiService.postIngredient(ingredient)
            .then(res => {
                this.props.onAddIngredient(res)
                this.setState({ ingredient: '' })
                name.value = ''
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const ingredients = this.props.ingredients
        const { error } = this.state
        return (
            <form className='add-ingredient' onSubmit={e => this.handleSubmit(e)}>
                <div role='alert'>
                    {error && <div className='error'>{error}</div>}
                </div>
                <h2>Add a new ingredient</h2>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input name='name' id='name' type='text' list='ingredients' onChange={e => this.updateIngredient(e.target.value)}/>
                    <datalist id='ingredients'>
                        {ingredients.map(ingredient => 
                            <option value={ingredient.name} key={ingredient.id}>{ingredient.name}</option>
                        )}
                    </datalist>
                    <ValidationError hasError={!this.state.ingredientValid} message={this.state.validationMessage}/>
                </div>
                <button type='submit' className='add-ingredient' disabled={!this.state.formValid}>Add ingredient</button>
            </form>
        )
    }
}