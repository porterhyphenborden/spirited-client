import React, { Component } from 'react'
import './IngredientRow.css'

export default class IngredientRow extends Component  {
    static defaultProps = {
        units: [],
        ingredients: [],
    }

    render() {
        const { units, ingredients } = this.props;
        return (
            <div className='ingredient-row'>
                <div className='ingredient-form-group amount'>
                    <label htmlFor='amount'>Amount</label>
                    <input name='amount' className='amount' id={'amount' + this.props.id} type='text' value={this.props.quantityValue} onChange={(e) => this.props.onUpdateAmount(this.props.id, e.target.value)} />
                </div>
                <div className='ingredient-form-group unit'>
                    <label htmlFor='unit'>Unit</label>
                    <input name='unit' className='unit' id={'unit' + this.props.id} list='units' value={this.props.unitValue} onChange={(e) => this.props.onUpdateUnit(this.props.id, e.target.value)} />
                    <datalist id='units'>
                        <select>
                            {units.map(unit => 
                                <option value={unit.unit_name} key={unit.id}>{unit.unit_name}</option>
                            )}
                        </select>
                    </datalist>
                </div>
                <div className='ingredient-form-group ingredient'>
                    <label htmlFor='ingredient'>Ingredient</label>
                    <input name='ingredient' className='ingredient' id={'ingredient' + this.props.id} list='ingredients' readOnly={this.props.readOnly ? true : false} value={this.props.nameValue} onChange={(e) => this.props.onUpdateName(this.props.id, e.target.value)} />
                    <datalist id='ingredients'>
                        <select>
                            {ingredients.map(ingredient => 
                                <option value={ingredient.name} key={ingredient.id}>{ingredient.name}</option>
                            )}
                        </select>
                    </datalist>
                </div>
                {this.props.onDeleteRow && <button className='delete-row' onClick={(e) => this.props.onDeleteRow(this.props.ciID, this.props.id, e)}>-</button>}
                {this.props.onDeleteNewRow && <button className='delete-row' onClick={(e) => this.props.onDeleteNewRow(e, this.props.id)}>-</button>}
            </div>
        )
    }
}