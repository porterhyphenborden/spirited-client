import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../utils/PrivateRoute'
import PublicOnlyRoute from '../utils/PublicOnlyRoute'
import PublicNav from '../Navigation/PublicNav'
import PrivateNav from '../Navigation/PrivateNav'
import LandingPage from '../../routes/LandingPage/LandingPage'
import SearchPage from '../../routes/SearchPage/SearchPage'
import CocktailPage from '../../routes/CocktailPage/CocktailPage'
import AddCocktailPage from '../../routes/AddCocktailPage/AddCocktailPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import UserLandingPage from '../../routes/UserLandingPage/UserLandingPage';

class App extends Component {

  render() {

    return (
      <div className='app'>
        <header>
          <Header />
        </header>
        <nav role='navigation'>
          <Route 
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
          />
          <Route 
            exact path='/my-cocktails'
            component={PrivateNav}
          />
          <Route 
            exact path='/add-cocktail'
            component={PrivateNav}
          />
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
            <PrivateRoute 
              exact path='/add-cocktail'
              component={AddCocktailPage}
            />
            <PrivateRoute 
              exact path='/my-cocktails'
              component={UserLandingPage}
            />
            <PublicOnlyRoute 
              exact path='/register'
              component={RegistrationPage}
            />
            <PublicOnlyRoute 
              exact path='/login'
              component={LoginPage}
            />
            {/* 
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