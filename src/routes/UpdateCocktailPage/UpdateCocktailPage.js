import React, { Component } from 'react';
import SpiritedApiService from '../../services/spirited-api-service'
import SpiritedContext from '../../SpiritedContext'
import UpdateCocktailForm from '../../components/UpdateCocktailForm/UpdateCocktailForm'
import AddIngredientForm from '../../components/AddIngredientForm/AddIngredientForm'
// import { Link } from 'react-router-dom';

export default class UpdateCocktailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            units: [],
            ingredients: [],
        }
    }

    static defaultProps = {
        match: { params: {} },
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
        const { cocktailId } = this.props.match.params;
        const { units, ingredients } = this.state;
        return (
            <div className='update-cocktail'>
                <UpdateCocktailForm 
                    cocktailId={cocktailId}
                    units={units}
                    ingredients={ingredients}
                    history={this.props.history}
                />
                <AddIngredientForm 
                    ingredients={ingredients}
                    onAddIngredient={this.addIngredient}
                />
            </div>
            
        )
    }
}