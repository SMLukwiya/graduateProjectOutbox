import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import auth from '../auth/auth-helper';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import auth from '../auth/auth-helper'

//indicate the current location of the application on the Menu
const isActive = (history, path) => {
  if (history.location.pathname == path) {
    return {color: '#ff4081'}
  }
  else {
    return {color: '#ffffff'}
  }
}

const Menu = withRouter(({history}) => {
  return (
    <div>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            BYARENT
          </Typography>
          <Link to='/'>
            <IconButton aria-label="Home" style={isActive(history, '/')}>
              <HomeIcon />
            </IconButton>
          </Link>
          <Link to='/buy'>
            <Button style={isActive(history, '/buy')}>Buy</Button>
          </Link>
          <Link to='/rent'>
            <Button style={isActive(history, '/rent')}>Rent</Button>
          </Link>
          {
            !auth.isAuthenticated() &&
              (<span>
                <Link to="/signup">
                  <Button style={isActive(history, "/signup")}>Sign up</Button>
                </Link>
                <Link to="/signin">
                  <Button style={isActive(history, "/signin")}>Log In</Button>
                </Link>
              </span>)
          }
          {
            auth.isAuthenticated() &&
              (<span>
                <Link to="/favourite">
                  <Button style={isActive(history, "/favourite")}>Favourite</Button>
                </Link>
                <Link to={"/user/" + auth.isAuthenticated().user._id}>
                  <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Account</Button>
                </Link>
                <Button color="inherit" onClick={() => {auth.signout(() => history.push('/'))}}>Sign out</Button>
              </span>)
          }

          </Toolbar>
        </AppBar>
      </div>
    )
})

export default Menu;
