import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SpiritedApiService from '../../services/spirited-api-service'
import SpiritedContext from '../../SpiritedContext'
import './CocktailPage.css'

export default class CocktailPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            cocktail: {},
            ingredients: [],
        }
    }

    static defaultProps = {
        match: { params: {} },
        history: {
            push: () => { }
        },
    }

    static contextType = SpiritedContext

    componentDidMount() {
        const { cocktailId } = this.props.match.params
        SpiritedApiService.getCocktail(cocktailId)
            .then((cocktail) => {
                this.setState({cocktail})
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
        SpiritedApiService.getIndredientsForCocktail(cocktailId)
            .then((ingredients) => {
                this.setState({ingredients})
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    handleDeleteCocktail(event, id) {
        event.preventDefault()
        SpiritedApiService.deleteCocktail(id)
            .then((res) => {
                this.props.history.push(`/my-cocktails/`)
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const cocktail = this.state.cocktail
        const ingredients = this.state.ingredients
        const { error } = this.state
        return (
            <div className='cocktail-recipe'>
                <div role='alert'>
                    {error && <div className='error'>{error}</div>}
                </div>
                <h3>{cocktail.name}</h3>
                <p>{cocktail.description}</p>
                {cocktail.created_by && 
                    <p>Credit: {cocktail.created_by}</p>}
                <ul className='ingredient-list'>
                    {ingredients.map(ingredient => 
                        <li key={ingredient.id}>
                            {ingredient.quantity} {ingredient.unit} {ingredient.name}
                        </li>
                    )}
                </ul>
                <p>Instructions: {cocktail.instructions}</p>
                {cocktail.garnish &&
                    <p>Garnish: {cocktail.garnish}</p>}
                {cocktail.glass &&
                    <p>Glass: {cocktail.glass}</p>}
                {cocktail.notes && 
                    <p>Notes: {cocktail.notes}</p>}
                {cocktail.ing_instructions &&
                    <p>Ingredient Instructions: {cocktail.ing_instructions}</p>}
                {cocktail.user_id && <Link className='update-button' to={`/my-cocktails/${cocktail.id}/update`}>
                    Update Cocktail
                </Link>}
                {cocktail.user_id && <button className='delete-button' onClick={(e) => this.handleDeleteCocktail(e, cocktail.id)}>
                    Delete Cocktail
                </button>}
            </div>
        )
    }
}