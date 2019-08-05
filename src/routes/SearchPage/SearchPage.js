import React, { Component } from 'react'
import CocktailSearchForm from '../../components/CocktailSearchForm/CocktailSearchForm'
import CocktailList from '../../components/CocktailList/CocktailList'
import CocktailCollections from '../../components/CocktailCollections/CocktailCollections'
import SpiritedContext from '../../SpiritedContext'
import './SearchPage.css'

export default class SearchPage extends Component {

    static contextType = SpiritedContext;

    componentDidMount() {
        this.context.setCocktailList([])
    }

    render() {
        const cocktails = this.context.cocktails
        if (cocktails.length === 0) {
            return (
                <div className='search-page'>
                    <CocktailCollections />
                    <CocktailSearchForm />
                </div>
            )
        }
        else {
            return (
                <div className='search-page'>
                    <CocktailCollections />
                    <CocktailSearchForm />
                    <CocktailList 
                        cocktails={cocktails}
                    />
                </div>
            )
        }
    }
}