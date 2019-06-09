import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from './auth-helper';

//Private Routes redirect to sign in page
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render = {(props) => (
      auth.isAuthenticated() ? <Component {...props} /> :
      (<Redirect to = {{
        pathname: '/signin',
        state: { from: props.location }
      }} />)
    )}/>
  )
}

export default PrivateRoute;
