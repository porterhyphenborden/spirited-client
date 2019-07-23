import React from 'react';

export default function IngredientRow(props) {
    const { units, ingredients } = props;
    return (
        <div className='ingredient-form-group'>
            <div className='form-group'>
                <label htmlFor='amount'>Amount</label>
                <input name='amount' id={'amount' + props.id} type='text' />
            </div>
            <div className='form-group'>
                <label htmlFor='unit'>Unit</label>
                <input name='unit' id={'unit' + props.id} list='units' />
                <datalist id='units'>
                    {units.map(unit => 
                        <option value={unit.unit_name} key={unit.id} />
                    )}
                </datalist>
            </div>
            <div className='form-group'>
                <label htmlFor='ingredient'>Ingredient</label>
                <input name='ingredient' id={'ingredient' + props.id} list='ingredients' />
                <datalist id='ingredients'>
                    {ingredients.map(ingredient => 
                        <option value={ingredient.name} key={ingredient.id} />
                    )}
                </datalist>
            </div>
        </div>
    )
}