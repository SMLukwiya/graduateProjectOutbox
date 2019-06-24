import React, { Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppBar, Toolbar, Paper, Stepper, Step, StepLabel,
        Button, List, ListItem, ListItemText, Typography,
        Dialog, DialogActions, DialogContent,
        DialogContentText, DialogTitle } from '@material-ui/core';

import PlaceOrder from './PlaceOrder';

import cart from './cart-helper';
import auth from '../auth/auth-helper';


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
  button: {
    color: '#4fc3f7'
  }
});


class Checkout extends Component {

  state = {
    cartItems: JSON.parse(sessionStorage.getItem('cart')),
    orderDetails: {},
    user: auth.isAuthenticated().user,
    error: ''
  }

  componentDidMount = () => {
    let user = auth.isAuthenticated().user
    let orderDetails = this.state.orderDetails
    orderDetails.houses = JSON.parse(sessionStorage.getItem('cart'))[0]._id
    orderDetails.name = user.name
    orderDetails.email = user.email
    orderDetails.user = user._id
    this.setState({orderDetails: orderDetails})
  }

  getTotal =() => {
    return this.state.cartItems.reduce((acc, currentPrice) => {
      return acc + currentPrice.price
    }, 0)
  }

  render() {
    const {classes} = this.props
    const user = this.state.user
    const orders = this.state.cartItems

    return (
      <div>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              BUYRENT
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper className={classes.stepper}>
                <Step>
                  <Typography variant="h6" gutterBottom>
                    Order summary
                  </Typography>
                  <List disablePadding>
                    {orders.map((order, index) => {
                      return (
                        <ListItem className={classes.listItem} key={index}>
                          <ListItemText primary={order.name} />&nbsp;&nbsp;
                          <Typography variant="body2">{"Price $"+order.price}</Typography>
                        </ListItem>
                      )
                    })}
                    <ListItem className={classes.listItem}>
                      <ListItemText primary="Total" />
                      <Typography variant="subtitle1" className={classes.total}>
                        $ {this.getTotal()}
                      </Typography>
                    </ListItem>
                    <Typography variant="h6" gutterBottom>
                      Name: {user.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Email: {user.email}
                    </Typography>
                  </List>
                  <PlaceOrder orderDetails={this.state.orderDetails} />
                    {
                      this.state.error && (<Typography component="p" color="error">
                          <Icon color="error" className={classes.error}>error</Icon>
                          {this.state.error}</Typography>)
                      }
                </Step>
            </Stepper>
            <div>
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                </React.Fragment>
            </div>
          </Paper>
          <Typography variant="p" align="right">
            Thanks for shopping with BUYRENT
          </Typography>
        </main>
      </div>)
  }
}

export default withStyles(styles)(Checkout);
