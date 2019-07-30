import React, { Component } from 'react';
import SpiritedContext from '../../SpiritedContext';
import SpiritedApiService from '../../services/spirited-api-service';
import CocktailList from '../../components/CocktailList/CocktailList'
// import { Link } from 'react-router-dom';

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
                <h2>My Cocktails</h2>
                <CocktailList 
                    cocktails={cocktails}
                />
            </div>
            
        )
    }
}