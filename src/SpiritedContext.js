import React, { Component } from 'react';
import TokenService from './services/token-service'

const SpiritedContext = React.createContext({
  cocktails: [],
  currentCocktail: {},
  cocktailIngredients: [],
  userCocktails: [],
  isLoggedIn: {},
  setCocktailList: () => {},
  setCurrentCocktail: () => {},
  setCurrentCocktailIng: () => {},
  setUserCocktails: () => {},
})

export default SpiritedContext;

export class SpiritedContextProvider extends Component {
  state = {
    cocktails: [],
    currentCocktail: {},
    userCocktails: [],
    cocktailIngredients: [],
    isLoggedIn: TokenService.hasAuthToken(),
  };

  setCocktailList = cocktails => {
    this.setState({ cocktails })
  }

  setCurrentCocktail = currentCocktail => {
    this.setState({ currentCocktail })
  }

  setCurrentCocktailIng = cocktailIngredients => {
    this.setState({ cocktailIngredients })
  }

  setUserCocktails = userCocktails => {
    this.setState({ userCocktails })
  }

  setIsLoggedIn = () => {
    let loggedIn = TokenService.hasAuthToken()
    this.setState({ 
      isLoggedIn: loggedIn
    })
  }

  render() {
    const value = {
      cocktails: this.state.cocktails,
      currentCocktail: this.state.currentCocktail,
      cocktailIngredients: this.state.cocktailIngredients,
      userCocktails: this.state.userCocktails,
      isLoggedIn: this.state.isLoggedIn,
      setCocktailList: this.setCocktailList,
      setCurrentCocktail: this.setCurrentCocktail,
      setCurrentCocktailIng: this.setCurrentCocktailIng,
      setUserCocktails: this.setUserCocktails,
      setIsLoggedIn: this.setIsLoggedIn,
    }

    return (
      <SpiritedContext.Provider value={value}>
        {this.props.children}
      </SpiritedContext.Provider>
    )
  }
}