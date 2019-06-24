import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import {Dialog, Button, IconButton, DialogActions, DialogContent,
        DialogContentText, DialogTitle} from '@material-ui/core';

import auth from '../auth/auth-helper'
import { remove } from './api-order.js'

class DeleteOrder extends Component {
  state = {
    open: false
  }

  clickButton = () => {
    this.setState({open: true})
  }

  deleteOrder = () => {
    const jwt = auth.isAuthenticated()
    remove({
      orderId: this.props.order._id
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({open: false}, () => {
          this.props.onRemove(this.props.order)
        })
      }
    })
  }

  handleRequestClose = () => {
    this.setState({open: false})
  }

  render() {
    return (<span>
      <IconButton aria-label="Delete" onClick={this.clickButton} color="secondary">
        <DeleteIcon/>
      </IconButton>
      <Dialog open={this.state.open} onClose={this.handleRequestClose}>
        <DialogTitle>{"Delete this order"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your order.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.deleteOrder} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>)
  }
}

DeleteOrder.propTypes = {
  product: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
}

export default DeleteOrder
