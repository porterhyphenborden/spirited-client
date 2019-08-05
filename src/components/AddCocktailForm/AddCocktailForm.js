import React, { Component } from 'react'
import ValidationError from '../ValidationError'
import IngredientRow from '../IngredientRow/IngredientRow'
import SpiritedApiService from '../../services/spirited-api-service'
import './AddCocktailForm.css'

export default class AddCocktailForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            count: 1,
            cocktailName: '',
            description: '',
            createdBy: '',
            ingredients: [{
                quantity: '',
                ingredientUnit: '',
                ingredientName: ''
            }],
            instructions: '',
            garnish: '',
            glass: '',
            notes: '',
            ingredientInstructions: '',
            cocktailNameValid: false,
            descriptionValid: false,
            quantityValid: false,
            ingredientUnitValid: false,
            ingredientNameValid: false,
            instructionsValid: false,
            formValid: false,
            validationMessages: {
                cocktailName: '',
                description: '',
                quantity: '',
                ingredientUnit: '',
                ingredientName: '',
                instructions: '',
            }
        }
    }

    static defaultProps = {
        history: {
          push: () => { }
        },
        units: [],
        ingredients: [],
    }

    updateCocktailName(cocktailName) {
        this.setState({cocktailName}, () => {this.validateName(cocktailName)})
    }

    updateDescription(description) {
        this.setState({description}, () => {this.validateDescription(description)})
    }

    updateCreatedBy(createdBy) {
        this.setState({createdBy})
    }

    updateQuantity = (id, quantity) => {
        let ingredients = [...this.state.ingredients]
        let ingredient = {...ingredients[id]}
        ingredient.quantity = quantity
        ingredients[id] = ingredient
        this.setState({ingredients}, () => {this.validateQuantity(quantity)})
    }

    updateIngredientUnit = (id, ingredientUnit) => {
        let ingredients = [...this.state.ingredients]
        let ingredient = {...ingredients[id]}
        ingredient.ingredientUnit = ingredientUnit
        ingredients[id] = ingredient
        this.setState({ingredients}, () => {this.validateIngredientUnit(ingredientUnit)})
    }

    updateIngredientName = (id, ingredientName) => {
        let ingredients = [...this.state.ingredients]
        let ingredient = {...ingredients[id]}
        ingredient.ingredientName = ingredientName
        ingredients[id] = ingredient
        this.setState({ingredients}, () => {this.validateIngredientName(ingredientName)})
    }

    updateInstructions(instructions) {
        this.setState({instructions}, () => {this.validateInstructions(instructions)})
    }

    updateGarnish(garnish) {
        this.setState({garnish})
    }

    updateGlass(glass) {
        this.setState({glass})
    }

    updateNotes(notes) {
        this.setState({notes})
    }

    updateIngInstructions(ingredientInstructions) {
        this.setState({ingredientInstructions})
    }

    validateName(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false
        
        fieldValue = fieldValue.trim()
        if(fieldValue.length === 0) {
            fieldErrors.cocktailName = 'Name is required.'
            hasError = true
        } 
        else {
            fieldErrors.name = ''
            hasError = false
        }
    
        this.setState({
            validationMessages: fieldErrors,
            cocktailNameValid: !hasError
        }, this.formValid )
    }

    validateDescription(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false
        
        fieldValue = fieldValue.trim()
        if(fieldValue.length === 0) {
            fieldErrors.description = 'Description is required.'
            hasError = true
        } 
        else {
            fieldErrors.description = ''
            hasError = false
        }
    
        this.setState({
            validationMessages: fieldErrors,
            descriptionValid: !hasError
        }, this.formValid )
    }

    validateInstructions(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false
        
        fieldValue = fieldValue.trim()
        if(fieldValue.length === 0) {
            fieldErrors.instructions = 'Instructions required.'
            hasError = true
        } 
        else {
            fieldErrors.instructions = ''
            hasError = false
        }
    
        this.setState({
            validationMessages: fieldErrors,
            instructionsValid: !hasError
        }, this.formValid )
    }

    validateQuantity(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false
        
        fieldValue = fieldValue.trim()
        if(fieldValue.length === 0) {
            fieldErrors.quantity = 'Ingredient amount is required.'
            hasError = true
        } 
        else {
            fieldErrors.quantity = ''
            hasError = false
        }
    
        this.setState({
            validationMessages: fieldErrors,
            quantityValid: !hasError
        }, this.formValid )
    }
    

    validateIngredientUnit(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        const unitsList = this.props.units
        const unitsListLower = unitsList.map(unit => unit.unit_name.toLowerCase())
        let hasError = false
        fieldValue = fieldValue.trim().toLowerCase()
        const found = unitsListLower.some(unit => unit === fieldValue)
        
        if (fieldValue.length === 0) {
            fieldErrors.ingredientUnit = 'Unit is required.'
            hasError = true
        } else {
            if (!found) {
                fieldErrors.ingredientUnit = 'That unit does not exist. Please use another.'
                hasError = true
            } else {
                fieldErrors.ingredientUnit = ''
                hasError = false
            }
        }
    
        this.setState({
            validationMessages: fieldErrors,
            ingredientUnitValid: !hasError
        }, this.formValid )
    }

    validateIngredientName(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        const ingredientsList = this.props.ingredients
        const ingredientsListLower = ingredientsList.map(ing => ing.name.toLowerCase())
        let hasError = false
        fieldValue = fieldValue.trim().toLowerCase()
        const found = ingredientsListLower.some(ing => ing === fieldValue)
        
        if (fieldValue.length === 0) {
            fieldErrors.ingredientName = 'Ingredient name is required.'
            hasError = true
        } else {
            if (!found) {
                fieldErrors.ingredientName = 'That ingredient does not exist. Please use form below to add ingredient.'
                hasError = true
            } else {
                fieldErrors.ingredientName = ''
                hasError = false
            }
        }
    
        this.setState({
            validationMessages: fieldErrors,
            ingredientNameValid: !hasError
        }, this.formValid )
    }

    formValid() {
        this.setState({
          formValid: this.state.cocktailNameValid && this.state.descriptionValid && this.state.instructionsValid
            && this.state.quantityValid && this.state.ingredientUnitValid && this.state.ingredientNameValid
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const cocktail = {
            name: this.state.cocktailName,
            description: this.state.description,
            created_by: this.state.createdBy,
            instructions: this.state.instructions,
            garnish: this.state.garnish,
            glass: this.state.glass,
            notes: this.state.notes,
            ing_instructions: this.state.ingredientInstructions,
        }
        SpiritedApiService.postcocktail(cocktail)
            .then(res => {
                let cocktail_id = res.id
                let newIngredients = this.state.ingredients
                let ingredientsList = this.props.ingredients
                let unitsList = this.props.units
                newIngredients.forEach(ing => {
                    ingredientsList.forEach(listIng => {
                        if (ing.ingredientName === listIng.name) {
                            ing.ingredient_id = listIng.id
                        }
                    })
                })
                newIngredients.forEach(ing => {
                    unitsList.forEach(listUnit => {
                        if (ing.ingredientUnit === listUnit.unit_name) {
                            ing.unit = listUnit.id
                        }
                    })
                })
                newIngredients.forEach(ing => {
                    delete ing.ingredientName
                    delete ing.ingredientUnit
                    ing.cocktail_id = cocktail_id
                })
                const promises = newIngredients.map(ing => {
                    return(SpiritedApiService.postCocktailIngredient(ing))
                })
                Promise.all(promises).then(res => {
                    this.props.history.push(`/cocktails/${res[0].cocktail_id}`)
                })
                .catch(res => {
                    this.setState({ error: res.error })
                })
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }


    RenderIngredientsRows(count) {
        let rows = []
        for (let i = 0; i < count; i++) {
            rows.push(
                <IngredientRow 
                    units={this.props.units} 
                    ingredients={this.props.ingredients} 
                    key={i} id={i}
                    onUpdateAmount={this.updateQuantity}
                    onUpdateUnit={this.updateIngredientUnit}
                    onUpdateName={this.updateIngredientName}
                    onDeleteNewRow={this.DeleteNewIngredientsRow}
                />)
        }
        return (
            <>
                {rows}
            </>
        )
    }

    DeleteNewIngredientsRow = (event, id) => {
        event.preventDefault()
        let count = this.state.count
        count -= 1
        if (count >= 1) {
            this.setState(state => {
                const ingredients = state.ingredients
                ingredients.splice(id, 1)
                return {
                    ingredients,
                    count: count,
                }
            })
        }
        else {
            this.setState({ count })
        }
    }

    AddIngredientsRow(event) {
        event.preventDefault()
        let count = this.state.count
        count += 1
        this.setState(state => {
            const ingredients = state.ingredients.concat({
                quantity: '',
                ingredientUnit: '',
                ingredientName: ''
            })
            return {
                ingredients,
                count: count,
            }
        })
    }

    render() {
        let count = this.state.count
        let ingredients = this.RenderIngredientsRows(count)
        const { error } = this.state
        return (
            <form className='add-cocktail' onSubmit={e => this.handleSubmit(e)}>
                <div role='alert'>
                    {error && <div className='error'>{error}</div>}
                </div>
                <h2>Add a new cocktail</h2>
                <p>* Indicates a required field.</p>
                <div className='form-group'>
                    <label htmlFor='name'>Name *</label>
                    <input name='name' id='name' type='text' required onChange={e => this.updateCocktailName(e.target.value)} />
                    <ValidationError hasError={!this.state.cocktailNameValid} message={this.state.validationMessages.cocktailName}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='description'>Description *</label>
                    <input name='description' id='description' type='text' required onChange={e => this.updateDescription(e.target.value)} />
                    <ValidationError hasError={!this.state.descriptionValid} message={this.state.validationMessages.description}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='credit'>Created by</label>
                    <input name='credit' id='credit' type='text' onChange={e => this.updateCreatedBy(e.target.value)} />
                </div>
                {ingredients}
                <ValidationError hasError={!this.state.quantityValid} message={this.state.validationMessages.quantity}/>
                <ValidationError hasError={!this.state.ingredientUnitValid} message={this.state.validationMessages.ingredientUnit}/>
                <ValidationError hasError={!this.state.ingredientNameValid} message={this.state.validationMessages.ingredientName}/>
                <button className='add-row' onClick={e => this.AddIngredientsRow(e)}>+</button>
                <div className='form-group'>
                    <label htmlFor='instructions'>Instructions *</label>
                    <textarea name='instructions' id='instructions' required onChange={e => this.updateInstructions(e.target.value)} />
                    <ValidationError hasError={!this.state.instructionsValid} message={this.state.validationMessages.instructions}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='garnish'>Garnish</label>
                    <input name='garnish' id='garnish' type='text' onChange={e => this.updateGarnish(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor='glass'>Glass</label>
                    <input name='glass' id='glass' type='text' onChange={e => this.updateGlass(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor='notes'>Notes</label>
                    <textarea name='notes' id='notes' placeholder='Rye whiskey is recommended.' onChange={e => this.updateNotes(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor='ingredient-instructions'>Instructions for ingredients</label>
                    <textarea name='ingredient-instructions' id='ingredient-instructions' placeholder='For thyme simple, mix 4 sprigs thyme, 1 cup sugar...' onChange={e => this.updateIngInstructions(e.target.value)} />
                </div>
                <button type='submit' className='add-cocktail' disabled={!this.state.formValid}>Add cocktail</button>
            </form>
        )
    }
}

