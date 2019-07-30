import React from 'react';

export default function IngredientRow(props) {
    const { units, ingredients } = props;
    return (
        <div className='ingredient-form-group'>
            <div className='form-group'>
                <label htmlFor='amount'>Amount</label>
                <input name='amount' id={'amount' + props.id} type='text' value={props.quantityValue} onChange={(e) => props.onUpdateAmount(props.id, e.target.value)} />
            </div>
            <div className='form-group'>
                <label htmlFor='unit'>Unit</label>
                <input name='unit' id={'unit' + props.id} list='units' value={props.unitValue} onChange={(e) => props.onUpdateUnit(props.id, e.target.value)} />
                <datalist id='units'>
                    {units.map(unit => 
                        <option value={unit.unit_name} key={unit.id} />
                    )}
                </datalist>
            </div>
            <div className='form-group'>
                <label htmlFor='ingredient'>Ingredient</label>
                <input name='ingredient' id={'ingredient' + props.id} list='ingredients' value={props.nameValue} onChange={(e) => props.onUpdateName(props.id, e.target.value)} />
                <datalist id='ingredients'>
                    {ingredients.map(ingredient => 
                        <option value={ingredient.name} key={ingredient.id} />
                    )}
                </datalist>
            </div>
            {props.onDeleteRow && <button onClick={(e) => props.onDeleteRow(props.ciID, props.id, e)}>Delete</button>}
        </div>
    )
}