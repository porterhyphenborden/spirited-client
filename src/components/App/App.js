import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import PrivateRoute from '../utils/PrivateRoute'
import PublicOnlyRoute from '../utils/PublicOnlyRoute'
import Navigation from '../Navigation/Navigation'
import LandingPage from '../../routes/LandingPage/LandingPage'
import SearchPage from '../../routes/SearchPage/SearchPage'
import CocktailPage from '../../routes/CocktailPage/CocktailPage'
import AddCocktailPage from '../../routes/AddCocktailPage/AddCocktailPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import UserLandingPage from '../../routes/UserLandingPage/UserLandingPage'
import UpdateCocktailPage from '../../routes/UpdateCocktailPage/UpdateCocktailPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import CollectionPage from '../../routes/CollectionPage/CollectionPage'
import './App.css'

class App extends Component {

  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    return (
      <div className='app'>
        <header>
          <Header />
        </header>
        <nav className='main-nav' role='navigation'>
          <Navigation />
        </nav>
        <main>
        {this.state.hasError && <p className='error'>There was an error! Please try again later.</p>}
          <Switch>
            <Route 
              exact path='/'
              component={LandingPage}
            />
            <Route 
              path='/cocktail-search'
              component={SearchPage}
            />
            <Route 
              exact path='/cocktails/:cocktailId'
              component={CocktailPage}
            />
            <Route 
              exact path='/collections/:collectionId'
              component={CollectionPage}
            />
            <PrivateRoute 
              exact path='/my-cocktails/:cocktailId'
              component={CocktailPage}
            />
            <PrivateRoute 
              path='/add-cocktail'
              component={AddCocktailPage}
            />
            <PrivateRoute 
              exact path='/my-cocktails'
              component={UserLandingPage}
            />
            <PrivateRoute 
              exact path='/my-cocktails/:cocktailId/update'
              component={UpdateCocktailPage}
            />
            <PublicOnlyRoute 
              path='/register'
              component={RegistrationPage}
            />
            <PublicOnlyRoute 
              exact path='/login'
              component={LoginPage}
            /> 
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </main>
      </div>

    )
  }
}

export default App