import React, { Component } from 'react';
import TokenService from './services/token-service'

const SpiritedContext = React.createContext({
  cocktails: [],
  userCocktails: [],
  isLoggedIn: {},
  setCocktailList: () => {},
  setUserCocktails: () => {},
  setIsLoggedIn: () => {},
})

export default SpiritedContext;

export class SpiritedContextProvider extends Component {
  state = {
    cocktails: [],
    userCocktails: [],
    isLoggedIn: TokenService.hasAuthToken(),
  };

  setCocktailList = cocktails => {
    this.setState({ cocktails })
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
      userCocktails: this.state.userCocktails,
      isLoggedIn: this.state.isLoggedIn,
      setCocktailList: this.setCocktailList,
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