import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {withStyles} from '@material-ui/styles';
import { Button, Typography, Icon, Dialog, DialogActions, DialogContent,
        DialogContentText, DialogTitle } from '@material-ui/core';

import auth from '../auth/auth-helper';
import cart from './cart-helper';
import {create} from '../order/api-order'


const styles = theme => ({
  title: {
    marginTop: theme.spacing(2),
  },
  button: {
    color: '#4fc3f7'
  },
  error: {
    display: 'inline',
    padding: "0px 10px"
  },
  errorIcon: {
    verticalAlign: 'middle'
  }
});

class PlaceOrder extends Component {
  state = {
    order: {},
    error: '',
    open: false,
    redirect: false
  }

  placeOrder = () => {
    const jwt = auth.isAuthenticated();
    create({ userId:jwt.user._id},
    { t: jwt.token },
    this.props.orderDetails).then((data) => {
      if (data.error) {
        console.log(data.error)
        this.setState({error: data.error})
      }
      else {
        cart.emptyCart(() => {
          this.setState({'orderId': data._id, 'open': true})
        })
      }
    })
  }

  handleClose = () => {
    this.setState({redirect: true});
  }

  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
      return (<Redirect to={'/order/' + this.state.orderId}/>)
    }

    return (
      <div>
        <Button className={classes.button} onClick={this.placeOrder}>Place Order</Button>
          <Dialog open={this.state.open} onClose={this.handleClose}
          aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Thank you for your order"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your order has been added to favourite. We have emailed your order confirmation, and will
              send you an update when your order status.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              View Order
            </Button>
          </DialogActions>
        </Dialog>
          {
            this.state.error && (<Typography component="p" color="error">
                <Icon color="error" className={classes.error}>error</Icon>
                {this.state.error}</Typography>)
            }
      </div>
    );
  }

}

export default withStyles(styles)(PlaceOrder);
