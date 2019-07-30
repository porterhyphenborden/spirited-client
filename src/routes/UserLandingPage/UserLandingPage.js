import React, { Component } from 'react';
import SpiritedContext from '../../SpiritedContext';
import SpiritedApiService from '../../services/spirited-api-service';
import UserCocktailList from '../../components/UserCocktailList/UserCocktailList'
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
        return (
            <div className='user-cocktails'>
                <h2>My Cocktails</h2>
                <UserCocktailList />
            </div>
            
        )
    }
}