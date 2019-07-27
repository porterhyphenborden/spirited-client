import React, { Component } from 'react';
import SpiritedApiService from '../../services/spirited-api-service';
import AddCocktailForm from '../../components/AddCocktailForm/AddCocktailForm';
import AddIngredientForm from '../../components/AddIngredientForm/AddIngredientForm';
import SpiritedContext from '../../SpiritedContext';

export default class AddCocktailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            units: [],
            ingredients: [],
        }
    }

    static contextType = SpiritedContext;

    componentDidMount() {
        SpiritedApiService.getUnits()
            .then((units) => {
                this.setState({ units })
            })
            .catch(error => {
                console.error({ error })
            })
        SpiritedApiService.getIngredients()
            .then((ingredients) => {
                this.setState({ ingredients })
            })
            .catch(error => {
                console.error({ error })
            })
    }

    addIngredient = ingredient => {
        this.setState({
            ingredients: [
                ...this.state.ingredients,
                ingredient
            ]
        })
    }

    render() {
        const { units, ingredients } = this.state;

        return (
            <>
                <AddCocktailForm 
                    units={units}
                    ingredients={ingredients}
                    history={this.props.history}
                />
                <AddIngredientForm 
                    ingredients={ingredients}
                    onAddIngredient={this.addIngredient}
                />
            </>
        )
    }
}