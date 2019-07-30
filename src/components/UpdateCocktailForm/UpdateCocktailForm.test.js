import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import UpdateCocktailForm from './UpdateCocktailForm'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <UpdateCocktailForm />
        </BrowserRouter>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})