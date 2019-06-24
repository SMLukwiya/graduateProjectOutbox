import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Button, Typography, Grid,
        Divider, ButtonBase, Paper } from '@material-ui/core';
import {withStyles} from '@material-ui/styles';

import auth from '../auth/auth-helper';
import cart from './cart-helper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    width: 'auto',
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(2),
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  image: {
    width: 350,
    height: 290,
  },
  img: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
})

class CartItems extends Component {
  state = {
    cartItems : JSON.parse(sessionStorage.getItem('cart')),
    setCheckout: false
  }

  removeItem =(index) => {
    let cartItems = cart.removeItem(index)
    this.setState({
      cartItems: cartItems,
      setCheckout: false
    })
  }

  openCheckout = () => {
    this.setState({setCheckout: true})
  }

  render() {
    const {classes} = this.props
    const house = this.state.cartItems

    if (this.state.setCheckout) {
      return (<Redirect to={'/checkout'} />)
    }

    return (
      <div className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item md={6}>
             <Paper className={classes.paper}>
               <div>
                 <Typography type="title" variant="h5" align="left"> Shopping Cart </Typography> <br/>
                 <Typography type="title" variant="p" align="left" component="p" display="inline"> Experience better shopping with a BUYrent account </Typography>
                 <Link to={'/signup'}>
                   <Button size="medium" color="primary" variant="outlined" align="right">SignUp</Button>
                 </Link>
               </div><br/><br/><br/>
               <Divider />
               {this.state.cartItems ? (<span>
                 {house.map((house, index) => {
                   return <span key={index}>
                     <Grid container spacing={2}>
                       <Grid item>
                         <ButtonBase className={classes.image}>
                           <img className={classes.img} alt={house.name} src={'/api/house/image/'+house._id} />
                         </ButtonBase>
                       </Grid>
                       <Grid item xs={12} sm container>
                         <Grid item xs container direction="column" spacing={2}>
                           <Grid item xs>
                             <Typography gutterBottom variant="subtitle1">
                               {house.name}
                             </Typography>
                             <Typography variant="body1" gutterBottom>
                               Catergory: Apartment {house.catergory}
                             </Typography>
                             <Typography variant="body1" gutterBottom>
                               Lease Options:12 months @ {house.price}
                             </Typography>
                             <Typography variant="body1" gutterBottom>
                               Bedrooms: {house.bedrooms}
                             </Typography>
                             <Typography variant="body1" gutterBottom>
                               Bathrooms: {house.bedrooms}
                             </Typography>
                             <Typography variant="body1" gutterBottom>
                               Garage: {house.garage}
                             </Typography>
                             <Typography variant="body2" gutterBottom>
                               Location: {house.location}
                             </Typography>
                             <Typography variant="body2" color="textSecondary">
                                Reference: {house.reference}
                             </Typography>
                           </Grid>
                           <Grid item>
                             <Link to={'/'}>
                               <Button dislay="inline" className={classes.buttons} size="medium" color="inherit" variant="outlined" >Continue shopping</Button>
                             </Link>&nbsp;&nbsp;
                             <Button dislay="inline" className={classes.buttons} size="medium" color="secondary" variant="outlined"  onClick={this.removeItem}>Remove</Button>
                           </Grid>
                         </Grid>
                         <Grid item>
                           <Typography variant="subtitle1">${house.price}</Typography>
                         </Grid>
                       </Grid>
                     </Grid><br/>
                     {
                       auth.isAuthenticated() ?
                       <Button variant="contained" color="primary" onClick={this.openCheckout}>Proceed To Checkout</Button>
                       :
                       <Link to={"/signin"}>
                         <Button color="primary" variant="raised">Sign in to checkout</Button>
                       </Link>
                     }
                   </span>
               })}</span>)
               : (<span>
                 <Typography type="subheading" component="h3" color="primary">No house added to your cart.</Typography>
                   <Link to={'/'}>
                     <Button dislay="inline" size="medium" color="inherit" variant="outlined" align="left">continue shopping</Button>
                   </Link>
                 </span>)
             }
            </Paper>
           </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(CartItems)
