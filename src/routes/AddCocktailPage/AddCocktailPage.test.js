import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AddCocktailPage from './AddCocktailPage'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <AddCocktailPage />
        </BrowserRouter>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})