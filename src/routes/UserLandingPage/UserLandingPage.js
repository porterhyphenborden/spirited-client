import React, { Component } from 'react';
import SpiritedContext from '../../SpiritedContext';
import SpiritedApiService from '../../services/spirited-api-service';
import CocktailList from '../../components/CocktailList/CocktailList'
import './UserLandingPage.css'
import coupe from '../../images/coupepsd.png'

export default class UserLandingPage extends Component {

    static contextType = SpiritedContext

    componentDidMount() {
        SpiritedApiService.getUserCocktails()
            .then((cocktails) => {
                this.context.setUserCocktails(cocktails)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        const cocktails = this.context.userCocktails
        return (
            <div className='user-cocktails'>
                <div className='list-header'>
                    <img src={coupe} alt='glass' className='cocktail-icon' />
                    <h2>My Cocktails</h2>
                </div>
                {cocktails.length === 0 && <p>Add a new cocktail to your library by using the link above!</p>}
                <CocktailList 
                    cocktails={cocktails}
                />
            </div>
            
        )
    }
}