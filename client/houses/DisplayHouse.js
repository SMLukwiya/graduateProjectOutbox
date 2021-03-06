import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar'
import StarBorderIcon from '@material-ui/icons/StarBorder';


import auth from '../auth/auth-helper';
import {read} from './api-house.js';
import cart from '../Cart/cart-helper';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  image: {
    height: '100%'
  },
  gridList: {
    width: '70%',
    minHeight: '50%',
    padding: '10px 0 15px'
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white'
  },
  titleChild: {
    color: theme.palette.primary.light
  },
  titleBaChild: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  paper: {
    maxWidth: '70%',
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(3,2)
  }
})

class DisplayHouse extends Component {
  constructor({match}) {
    super()
    this.state = {
      house: '',
      redirect: false
    }
    this.match = match
  }

  loadHouse = (houseId) => {
    read({
      houseId: houseId
    }).then((data) => {
      if (data.error) {
        console.log(data.error);
        this.setState({error: data.error});
      }
      else {
        this.setState({house: data});
      }
    })
  }

//Add house to cart and redirect page
  addToCart = () => {
    let cart = [];
      if (typeof window !== undefined) {
        try {
          if (sessionStorage.getItem('cart')) {
            cart = JSON.parse(sessionStorage.getItem('cart'));
          }
          cart.push(this.state.house)
          sessionStorage.setItem('cart', JSON.stringify(cart))
          if (JSON.parse(sessionStorage.getItem('cart')).length >= 2) {
            alert('You can only buy two houses at once')
          }
        }
        catch(err) {
          this.setState({redirect: true})
        }
      }
       this.setState({redirect: true})
  }

  componentDidMount = () => {
    this.loadHouse(this.match.params.houseId)
  }
  componentWillReceiveProps = (props) => {
    this.loadHouse(props.match.params.houseId)
  }

  render() {
     const {classes} = this.props
     const house = this.state.house
     const catergory = this.state.house.catergory

     if (this.state.redirect) {
       return (<Redirect to={'/cart'} />)
     }
     return (
        <div className={classes.root}>
          <GridList cellHeight={300} spacing={1} className={classes.gridList}>
              <GridListTile key={house._id} cols={2} rows={2}>
                <img className={classes.image} src={'/api/house/image/'+house._id} alt={house.name} />
                <GridListTileBar title={house.name} titlePosition="top" actionIcon={
                  <IconButton aria-label={`star ${house.name}`} className={classes.icon}> <StarBorderIcon /> </IconButton>}
                  actionPosition="left" className={classes.titleBar} />
              </GridListTile>
          </GridList>

          <GridList spacing={2} className={classes.gridList} cols={4}>
              <GridListTile key={house._id}>
                <img src={'/api/house/image/'+house._id} alt={house.title} />
                <GridListTileBar title={house.name} classes={{ root: classes.titleBarChild, title: classes.titleChild }} />
              </GridListTile>
              <GridListTile key={house._id}>
                <img src={'/api/house/image/'+house._id} alt={house.title} />
                <GridListTileBar title={house.name} classes={{ root: classes.titleBarChild, title: classes.titleChild }} />
              </GridListTile>
              <GridListTile key={house._id}>
                <img src={'/api/house/image/'+house._id} alt={house.title} />
                <GridListTileBar
                  title={house.name}
                  classes={{ root: classes.titleBarChild, title: classes.titleChild }} />
              </GridListTile>
              <GridListTile key={house._id}>
                <img src={'/api/house/image/'+house._id} alt={house.title} />
                <GridListTileBar
                  title={house.name}
                  classes={{ root: classes.titleBarChild, title: classes.titleChild }} />
              </GridListTile>
          </GridList>

          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3" display="inline" align="left"> About {house.name} </Typography><br/><br/>
            <Typography component="p"> Posted: {(new Date(house.created)).toDateString()} </Typography><br/>
            <Typography component="p"> {house.about} </Typography>
          </Paper>

          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h5" component="h3"> Catergory:</Typography>
              <Typography component="p"> Apartment {house.catergory}</Typography><br/>
              <Typography variant="h5" component="h3"> Lease Options:</Typography>
              <Typography component="p"> 12 months @ $2000</Typography>
              <Typography component="p"> Bedrooms: {house.bedrooms}</Typography>
              <Typography component="p"> Bathrooms: 2</Typography>
              <Typography component="p"> Garage: {house.garage}</Typography>
              <Typography component="p"> Reference: {house.reference}</Typography><br/>
              <Typography variant="h5" component="h3"> Location</Typography>
              <Typography component="p">{house.location}</Typography><br/>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" size="large" disabled="true">
              ${house.price}
            </Button>
            <br/>
            <br/>
            {
              catergory === 'For Rent' ?
              <Button variant="contained" color="primary" size="large" onClick={this.addToCart}>
                Rent
              </Button>
              :
              <Button variant="contained" color="primary" size="large" onClick={this.addToCart}>
                Buy
              </Button>
            }
          </Grid>
        </div>
    )
  }
}

DisplayHouse.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DisplayHouse);
