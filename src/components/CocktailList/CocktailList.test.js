import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import CocktailList from './CocktailList'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <CocktailList />
        </BrowserRouter>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})