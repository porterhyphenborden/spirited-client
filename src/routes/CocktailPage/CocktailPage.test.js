import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import CocktailPage from './CocktailPage'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <CocktailPage />
        </BrowserRouter>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})