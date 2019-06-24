import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import {Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar,
        Divider, ListItemSecondaryAction } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import DeleteOrder from './DeleteOrder';

import { list  } from './api-order';
import auth from '../auth/auth-helper';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
   margin: `${theme.spacing(2)}px 0 12px ${theme.spacing()}px` ,
   color: theme.palette.openTitle
 }
});

class Favourites extends Component {
  state = {
    orders: [],
    open: false
  }

  loadOrders = () => {
    const jwt = auth.isAuthenticated()
    list({
      userId: jwt.user._id
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({orders: data})
      }
    })
  }

  componentDidMount = () => {
    this.loadOrders()
  }

  removeOrder = (order) => {
    const updatedOrders = this.state.orders
    const index = updatedOrders.indexOf(order)
    updatedOrders.splice(index, 1)
    this.setState({orders: updatedOrders})
  }

  render() {
    const {classes} = this.props
    const orders = this.state.orders

    return (
      <div>
        <Typography type="title" className={classes.title}>
          Your Orders
        </Typography>
        <List className={classes.root}>
        {orders.map((order, index) => {
          return <span key={index}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <Link to={'/order/'+order._id}>
                  <ListItemText primary={"Order code "+ order._id} secondary={(new Date(order.created)).toDateString()} />
                </Link>
                <ListItemSecondaryAction>
                  <DeleteOrder order={order} onRemove={this.removeOrder}/>
                </ListItemSecondaryAction>
              </ListItem>
            <Divider/>
          </span>
        })
        }
        </List>
      </div>
    )
  }
}

Favourites.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Favourites);
