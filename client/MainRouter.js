import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import Home from './Core/Home';
import Users from './user/Users';
import Signup from './user/Signup';
import Signin from './auth/Signin';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile';
import PrivateRoute from './auth/PrivateRoute';
import Menu from './core/Menu';
import Buy from './houses/forSale/Buy'
import Rent from './houses/forRent/Rent'
import BuyDisplayHouse from './houses/forSale/DisplayHouse';
import RentDisplayHouse from './houses/forRent/DisplayHouse';

class MainRouter extends Component {
  ///*** Server Side Rendering***///
// Removes the server-side injected CSS when React component mounts
  // componentDidMount() {
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   if (jssStyles && jssStyles.parentNode) {
  //     jssStyles.parentNode.removeChild(jssStyles);
  //   }
  // }

  render () {
    return (
      <div>
      <Menu />
        <Switch>
          <Route exact path='/' component = {Home} />
          <Route path='/buy' component = {Buy} />
          <Route path='/rent' component = {Rent} />
          <Route path='/signup' component = {Signup} />
          <Route path='/signin' component = {Signin} />
          <Route path='/buyhouse/:houseId' component = {BuyDisplayHouse} />
          <Route path='/renthouse/:houseId' component = {RentDisplayHouse} />
          <PrivateRoute path='/user/edit/:userId' component = {EditProfile} />
          //protected route, only accessible by authorized and authenticated users
          <Route path='/user/:userId' component = {Profile} />
        </Switch>
      </div>
    );
  }
}

export default MainRouter;
