import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AddCocktailForm from './AddCocktailForm'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <AddCocktailForm />
        </BrowserRouter>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})