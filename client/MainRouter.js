import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Core/Home';
import Signup from './user/Signup';
import Signin from './auth/Signin';
import Menu from './Core/Menu';
import Buy from './houses/Buy'
import Rent from './houses/Rent'
import DisplayHouse from './houses/DisplayHouse';
import Cart from './Cart/CartItems';
import Checkout from './Cart/Checkout';
import Order from './order/Order';
import Footer from './Core/Footer';
import CreateHouse from './houses/CreateHouse';
import Favourite from './order/Favourite';
import AdminPage from './admin/AdminPage';
import AdminSignIn from './auth/AdminSignin';

class MainRouter extends Component {

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
          <Route path='/house/:houseId' component = {DisplayHouse} />
          <Route path='/cart' component = {Cart} />
          <Route path='/checkout' component = {Checkout} />
          <Route path="/order/:orderId" component={Order}/>
          <Route path="/create" component={CreateHouse}/>
          <Route path="/favourite" component={Favourite}/>
          <Route path='/access/admin' component = {AdminPage} />
          <Route path='/adminsignin' component = {AdminSignIn} />
        </Switch>
      <Footer />
      </div>
    );
  }
}

export default MainRouter;
