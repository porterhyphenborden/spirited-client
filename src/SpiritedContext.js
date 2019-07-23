import React, { Component } from 'react';

const SpiritedContext = React.createContext({
  cocktails: [],
  currentCocktail: {},
  setCocktailList: () => {},
  setCurrentCocktail: () => {},
  setCurrentCocktailIng: () => {},
})

export default SpiritedContext;

export class SpiritedContextProvider extends Component {
  state = {
    cocktails: [],
    currentCocktail: {},
    cocktailIngredients: [],
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

  render() {
    const value = {
      cocktails: this.state.cocktails,
      currentCocktail: this.state.currentCocktail,
      cocktailIngredients: this.state.cocktailIngredients,
      setCocktailList: this.setCocktailList,
      setCurrentCocktail: this.setCurrentCocktail,
      setCurrentCocktailIng: this.setCurrentCocktailIng,
    }
    return (
      <SpiritedContext.Provider value={value}>
        {this.props.children}
      </SpiritedContext.Provider>
    )
  }
}