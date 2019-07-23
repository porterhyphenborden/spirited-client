import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation'
import LandingPage from '../../routes/LandingPage/LandingPage'
import SearchPage from '../../routes/SearchPage/SearchPage'
import CocktailPage from '../../routes/CocktailPage/CocktailPage'
import AddCocktailPage from '../../routes/AddCocktailPage/AddCocktailPage'

class App extends Component {

  render() {

    return (
      <div className='app'>
        <Header />
        <nav role='navigation'>
          {/* <Route 
            exact path='/'
            component={PublicNav}
          />
          <Route 
            exact path='/login'
            component={PublicNav}
          />
          <Route 
            exact path='/register'
            component={PublicNav}
          />
          <Route 
            exact path='/cocktail-search'
            component={PublicNav}
          />
          <Route 
            exact path='/cocktail/:cocktailId'
            component={PublicNav}
          /> */}
          <Navigation />
        </nav>
        <main>
          <Switch>
            <Route 
              exact path='/'
              component={LandingPage}
            />
            <Route 
              exact path='/cocktail-search'
              component={SearchPage}
            />
            <Route 
              exact path='/cocktails/:cocktailId'
              component={CocktailPage}
            />
            <Route 
              exact path='/add-cocktail'
              component={AddCocktailPage}
            />
            {/* <Route 
              exact path='/login'
              component={LoginPage}
            />
            <Route 
              exact path='/register'
              component={RegistrationPage}
            />
            <Route
              component={NotFoundPage}
            /> */}
          </Switch>
        </main>
      </div>

    )
  }
}

export default App;