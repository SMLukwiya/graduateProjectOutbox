import React from 'react';
import { AppBar, Toolbar, Typography, List, ListItem,
        ListItemText, IconButton, Badge, Button } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import {Link, withRouter} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

import auth from '../auth/auth-helper';
import cart from '../Cart/cart-helper'

//indicate the current location of the application on the Menu
const isActive = (history, path) => {
  if (history.location.pathname == path) {
    return {color: '#ff4081'}
  }
  else {
    return {color: '#ffffff'}
  }
}

const styles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  button: {
    color:'#ffffff'
  }
}));

const Menu = withRouter(({history}) => {
  const classes = styles();
  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar>
          {
            !auth.isAuthenticated() &&
              (<span>
                <Typography variant="title" color="inherit">
                  BUYRENT
                </Typography>
                <Link to='/'>
                  <IconButton className={classes.menuButton} aria-label="Home" style={isActive(history, '/')}>
                    <HomeIcon />
                  </IconButton>
                </Link>
                <Link to='/buy'>
                  <Button style={isActive(history, '/buy')} className={classes.menuButton}>Buy</Button>
                </Link>
                <Link to='/rent'>
                  <Button style={isActive(history, '/rent')} className={classes.menuButton}>Rent</Button>
                </Link>
                <Link to="/signup">
                  <Button style={isActive(history, "/signup")} className={classes.menuButton}>Sign up</Button>
                </Link>
                <Link to="/signin">
                  <Button style={isActive(history, "/signin")} className={classes.menuButton}>Log In</Button>
                </Link>
                <Link to='/cart'>
                  <IconButton aria-label="Cart" style={isActive(history, '/cart')}>
                    <Badge badgeContent={cart.itemTotal()} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Link>
              </span>)
          }
          {
            auth.isAuthenticated().user &&
              (<span>
                <Typography variant="title" color="inherit">
                  BUYRENT
                </Typography>
                <Link to='/'>
                  <IconButton className={classes.menuButton} aria-label="Home" style={isActive(history, '/')}>
                    <HomeIcon />
                  </IconButton>
                </Link>
                <Link to='/buy'>
                  <Button style={isActive(history, '/buy')} className={classes.menuButton}>Buy</Button>
                </Link>
                <Link to='/rent'>
                  <Button style={isActive(history, '/rent')} className={classes.menuButton}>Rent</Button>
                </Link>
                <Link to="/favourite">
                  <Button style={isActive(history, "/favourite")}>Favourite</Button>
                </Link>
                <Button color="inherit" onClick={() => {auth.signout(() => history.push('/'))}}>Sign out</Button>
                  <Link to='/cart'>
                    <IconButton aria-label="Cart" style={isActive(history, '/cart')}>
                      <Badge badgeContent={cart.itemTotal()} color="secondary">
                        <ShoppingCartIcon />
                      </Badge>
                    </IconButton>
                  </Link>
              </span>)
          }
          {
            auth.isAuthenticated().admin &&
              (<span>
                <Typography variant="title" color="inherit">
                  BUYRENT ADMIN PAGE
                </Typography>
                <Link to='/access/admin'>
                  <IconButton className={classes.menuButton} aria-label="Home" style={isActive(history, '/access/admin')}>
                    <HomeIcon />
                  </IconButton>
                </Link>
                <Link to='/create'>
                  <Button className={classes.button}>Create New House</Button>
                </Link>
                <Button color="inherit" onClick={() => {
                    auth.signout(() => history.push('/adminsignin'))}}>Logout</Button>
              </span>)
          }
          </Toolbar>
        </AppBar>
      </div>
    )
})

export default Menu;
