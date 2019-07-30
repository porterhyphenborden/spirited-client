import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AddIngredientForm from './AddIngredientForm'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <AddIngredientForm />
        </BrowserRouter>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})