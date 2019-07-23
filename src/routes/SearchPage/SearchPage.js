import React, { Component } from 'react';
import CocktailSearchForm from '../../components/CocktailSearchForm/CocktailSearchForm'
import CocktailList from '../../components/CocktailList/CocktailList'
import SpiritedContext from '../../SpiritedContext';

export default class SearchPage extends Component {

    static contextType = SpiritedContext;

    componentDidMount() {
        this.context.setCocktailList([])
    }

    render() {
        const cocktails = this.context.cocktails;
        if (cocktails.length === 0) {
            return (
                <>
                    <CocktailSearchForm />
                </>
            )
        }
        else {
            return (
                <>
                    <CocktailSearchForm />
                    <CocktailList />
                </>
            )
        }
    }
}