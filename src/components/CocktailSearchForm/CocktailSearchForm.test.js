import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import CocktailSearchForm from './CocktailSearchForm'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <CocktailSearchForm />
        </BrowserRouter>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})