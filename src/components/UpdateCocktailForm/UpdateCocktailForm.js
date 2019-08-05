import React, { Component } from 'react'
import SpiritedContext from '../../SpiritedContext'
import ValidationError from '../ValidationError'
import IngredientRow from '../IngredientRow/IngredientRow'
import SpiritedApiService from '../../services/spirited-api-service'
import './UpdateCocktailForm.css'

export default class UpdateCocktailForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            cocktailId: this.props.cocktailId,
            count: 0,
            cocktailName: '',
            description: '',
            createdBy: '',
            newIngredients: [{
                quantity: '',
                ingredientUnit: '',
                ingredientName: ''
            }],
            currentIngredients: [],
            instructions: '',
            garnish: '',
            glass: '',
            notes: '',
            ingredientInstructions: '',
            cocktailNameValid: true,
            descriptionValid: true,
            quantityValid: true,
            ingredientUnitValid: true,
            ingredientNameValid: true,
            instructionsValid: true,
            formValid: false,
            validationMessages: {
                cocktailName: '',
                description: '',
                quantity: '',
                ingredientUnit: '',
                ingredientName: '',
                instructions: '',
            },
            cocktailHasChanged: false,
            ingredientsHaveChanged: false,
        }
    }

    static defaultProps = {
        history: {
          push: () => { }
        },
        ingredients: [],
        units: [],
    }

    static contextType = SpiritedContext

    componentDidMount() {
        const cocktailId = this.state.cocktailId
        SpiritedApiService.getCocktail(cocktailId)
            .then((cocktail) => {
                this.setState({
                    cocktailName: cocktail.name,
                    description: cocktail.description,
                    createdBy: cocktail.created_by,
                    instructions: cocktail.instructions,
                    garnish: cocktail.garnish,
                    glass: cocktail.glass,
                    notes: cocktail.notes,
                    ingredientInstructions: cocktail.ing_instructions,
                })
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
        SpiritedApiService.getIndredientsForCocktail(cocktailId)
            .then((currentIngredients) => {
                this.setState({
                    currentIngredients
                })
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    updateCocktailName(cocktailName) {
        this.setState({ cocktailName, cocktailHasChanged: true }, () => {this.validateName(cocktailName)})
    }

    updateDescription(description) {
        this.setState({ description, cocktailHasChanged: true }, () => {this.validateDescription(description)})
    }

    updateCreatedBy(createdBy) {
        this.setState({ createdBy, cocktailHasChanged: true }, this.formValid )
    }

    updateQuantity = (id, quantity) => {
        let newIngredients = [...this.state.newIngredients]
        let newIngredient = {...newIngredients[id]}
        newIngredient.quantity = quantity
        newIngredients[id] = newIngredient
        this.setState({newIngredients}, () => {this.validateQuantity(quantity)})
    }

    updateIngredientUnit = (id, ingredientUnit) => {
        let newIngredients = [...this.state.newIngredients]
        let newIngredient = {...newIngredients[id]}
        newIngredient.ingredientUnit = ingredientUnit
        newIngredients[id] = newIngredient
        this.setState({newIngredients}, () => {this.validateIngredientUnit(ingredientUnit)})
    }

    updateIngredientName = (id, ingredientName) => {
        let newIngredients = [...this.state.newIngredients]
        let newIngredient = {...newIngredients[id]}
        newIngredient.ingredientName = ingredientName
        newIngredients[id] = newIngredient
        this.setState({newIngredients}, () => {this.validateIngredientName(ingredientName)})
    }

    updateCurrentQuantity = (id, quantity) => {
        let currentIngredients = [...this.state.currentIngredients]
        let currentIngredient = {...currentIngredients[id]}
        currentIngredient.quantity = quantity
        currentIngredient.hasChanged = true
        currentIngredients[id] = currentIngredient
        this.setState({ currentIngredients, ingredientsHaveChanged: true }, () => {this.validateQuantity(quantity)})
    }

    updateCurrentIngredientUnit = (id, unit) => {
        let currentIngredients = [...this.state.currentIngredients]
        let currentIngredient = {...currentIngredients[id]}
        currentIngredient.unit = unit
        currentIngredient.hasChanged = true
        currentIngredients[id] = currentIngredient
        this.setState({ currentIngredients, ingredientsHaveChanged: true }, () => {this.validateIngredientUnit(unit)})
    }

    updateCurrentIngredientName = (id, name) => {
        let currentIngredients = [...this.state.currentIngredients]
        let currentIngredient = {...currentIngredients[id]}
        currentIngredient.name = name
        currentIngredient.hasChanged = true
        currentIngredients[id] = currentIngredient
        this.setState({ currentIngredients, ingredientsHaveChanged: true }, () => {this.validateIngredientName(name)})
    }

    updateInstructions(instructions) {
        this.setState({instructions, cocktailHasChanged: true }, () => {this.validateInstructions(instructions)})
    }

    updateGarnish(garnish) {
        this.setState({garnish, cocktailHasChanged: true }, this.formValid )
    }

    updateGlass(glass) {
        this.setState({glass, cocktailHasChanged: true }, this.formValid)
    }

    updateNotes(notes) {
        this.setState({notes, cocktailHasChanged: true }, this.formValid)
    }

    updateIngInstructions(ingredientInstructions) {
        this.setState({ingredientInstructions, cocktailHasChanged: true, otherFieldsValid: true  })
    }

    validateName(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false
        
        fieldValue = fieldValue.trim()
        if(fieldValue.length === 0) {
            fieldErrors.name = 'Name is required.'
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
        const cocktailId = this.state.cocktailId
        const ingredientsList = this.props.ingredients
        const unitsList = this.props.units
        //Check for updates to cocktail fields, if so, PATCH
        if (this.state.cocktailHasChanged) {
            SpiritedApiService.patchCocktail(cocktail, cocktailId)
                .then(res => {
                    this.props.history.push(`/cocktails/${cocktailId}`)
                })
                .catch(res => {
                    this.setState({ error: res.error })
                })
        }
        //Check whether new ingredients have been added, if so, POST
        if (this.state.newIngredients[0].ingredientName) {
                const newIngredients = this.state.newIngredients
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
                    ing.cocktail_id = cocktailId
                })
                const promises = newIngredients.map(ing => {
                    return(SpiritedApiService.postCocktailIngredient(ing))
                })
                Promise.all(promises)
                    .then(res => {
                        this.props.history.push(`/cocktails/${cocktailId}`)
                    })
                        .catch(res => {
                        this.setState({ error: res.error })
                    })
            }
        //Check whether any ingredients have been updated, if so, PATCH
        if (this.state.ingredientsHaveChanged) {
            const ingredients = this.state.currentIngredients
            const updatedIngredients = []
            ingredients.forEach(ing => {
                if (ing.hasChanged) {
                    updatedIngredients.push(ing)
                }
            })
            updatedIngredients.forEach(ing => {
                unitsList.forEach(listUnit => {
                    if (ing.unit === listUnit.unit_name) {
                        ing.unit = listUnit.id
                    }
                })
                delete ing.name
                delete ing.hasChanged
            })
            const promises = updatedIngredients.map(ing => {
                return(SpiritedApiService.patchCocktailIngredient(ing, ing.ciID))
            })
            Promise.all(promises)
                .then(res => {
                    this.props.history.push(`/cocktails/${cocktailId}`)
                })
                .catch(res => {
                    this.setState({ error: res.error })
                })
        }
    }

    //If ingredient row has been deleted, DELETE, and delete from DOM
    onDeleteRow = (ciID, key, event) => {
        event.preventDefault()
        SpiritedApiService.deleteCocktailIngredient(ciID)
        const currentIngredients = [...this.state.currentIngredients]
        currentIngredients.splice(key, 1)
        this.setState({ currentIngredients , cocktailHasChanged: true}, this.formValid)
    }

    RenderIngredientsRows() {
        const ingredients = this.state.currentIngredients
        return (
            <>
                {ingredients.map((ingredient, i) =>
                    <IngredientRow 
                        units={this.props.units} 
                        ingredients={this.props.ingredients} 
                        key={i} 
                        id={i}
                        ciID={ingredient.ciID}
                        quantityValue={ingredient.quantity}
                        unitValue={ingredient.unit}
                        nameValue={ingredient.name}
                        onUpdateAmount={this.updateCurrentQuantity}
                        onUpdateUnit={this.updateCurrentIngredientUnit}
                        onUpdateName={this.updateCurrentIngredientName}
                        onDeleteRow={this.onDeleteRow}
                        readOnly={'readonly'}
                    />
                )}
            </>
        )
    }

    RenderNewIngredientsRows(count) {
        let keyNum = this.state.currentIngredients.length
        let rows = []
        for (let i = 0; i < count; i++) {
            rows.push(
                <IngredientRow 
                    units={this.props.units} 
                    ingredients={this.props.ingredients} 
                    key={i + keyNum} id={i}
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
                const newIngredients = state.newIngredients
                newIngredients.splice(id, 1)
                return {
                    newIngredients,
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
        if (count > 1) {
            this.setState(state => {
                const newIngredients = state.newIngredients.concat({
                    quantity: '',
                    ingredientUnit: '',
                    ingredientName: ''
                })
                return {
                    newIngredients,
                    count: count,
                }
            })
        }
        else {
            this.setState({ count })
        }
    }

    render() {
        const { cocktailName, description, createdBy, instructions, garnish, glass, notes, ingredientInstructions } = this.state
        let count = this.state.count
        let currentIngredients = this.RenderIngredientsRows()
        let ingredients = this.RenderNewIngredientsRows(count)
        const { error } = this.state
        return (
            <form className='update-cocktail' onSubmit={e => this.handleSubmit(e)}>
                <div role='alert'>
                    {error && <div className='error'>{error}</div>}
                </div>
                <h2>Update Cocktail Recipe</h2>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input name='name' id='name' type='text' value={cocktailName} onChange={e => this.updateCocktailName(e.target.value)} />
                    <ValidationError hasError={!this.state.cocktailNameValid} message={this.state.validationMessages.cocktailName}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='description'>Description</label>
                    <input name='description' id='description' type='text' value={description} onChange={e => this.updateDescription(e.target.value)} />
                    <ValidationError hasError={!this.state.descriptionValid} message={this.state.validationMessages.description}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='credit'>Created by</label>
                    <input name='credit' id='credit' type='text' value={createdBy} onChange={e => this.updateCreatedBy(e.target.value)} />
                </div>
                {currentIngredients}
                {ingredients}
                <ValidationError hasError={!this.state.quantityValid} message={this.state.validationMessages.quantity}/>
                <ValidationError hasError={!this.state.ingredientUnitValid} message={this.state.validationMessages.ingredientUnit}/>
                <ValidationError hasError={!this.state.ingredientNameValid} message={this.state.validationMessages.ingredientName}/>
                <div className='ingredient-info' id='ingredient-info'>If you need to update an ingredient's name, please delete and re-add.</div>
                <button className='add-row' onClick={e => this.AddIngredientsRow(e)}>+</button>
                <div className='form-group'>
                    <label htmlFor='instructions'>Instructions</label>
                    <textarea name='instructions' id='instructions' value={instructions} onChange={e => this.updateInstructions(e.target.value)} />
                    <ValidationError hasError={!this.state.instructionsValid} message={this.state.validationMessages.instructions}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='garnish'>Garnish</label>
                    <input name='garnish' id='garnish' type='text' value={garnish} onChange={e => this.updateGarnish(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor='glass'>Glass</label>
                    <input name='glass' id='glass' type='text' value={glass} onChange={e => this.updateGlass(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor='notes'>Notes</label>
                    <textarea name='notes' id='notes' value={notes} onChange={e => this.updateNotes(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor='ingredient-instructions'>Instructions for ingredients</label>
                    <textarea name='ingredient-instructions' id='ingredient-instructions' value={ingredientInstructions} onChange={e => this.updateIngInstructions(e.target.value)} />
                </div>
                <button type='submit' className='update-cocktail' disabled={!this.state.formValid}>Update</button>
            </form>
        )
    }
}

