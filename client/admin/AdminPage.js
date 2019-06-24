import React, { Component } from 'react';
import { Router, Route, Link, Redirect } from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, GridListTile, GridListTileBar,
        GridList, CssBaseline } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';

import { list } from '../houses/api-house.js';
import { adminSignout } from '../auth/api-auth';
import auth from '../auth/auth-helper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    color:'#ffffff'
  },
  rootList: theme.mixins.gutters({
    padding: theme.spacing(),
    margin: theme.spacing(5)
  }),
  titleList: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  rootHouse: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    textAlign: 'left',
    padding: '0 8px'
  },
  gridList: {
    width: 1250,
    minHeight: '50%',
    padding: '20px 0 15px'
  },
  titleHouse: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    width: '100%'
  },
  tile: {
    textAlign: 'center'
  },
  image: {
    height: '100%'
  },
  tileBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    textAlign: 'left'
  },
  tileTitle: {
    fontSize:'1.1em',
    marginBottom:'5px',
    color:'rgb(189, 222, 219)',
    display:'block'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  }
})

class AdminPage extends Component {
  state = {
    houses: []
  }

  componentDidMount() {
    const jwt = auth.isAuthenticated();
    list({t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error);
      }
      else {
        this.setState({ houses: data});
      }
    })
  }

  logout() {
    adminSignout();
    history.push('/signin');
  }

    render() {
      const {classes} = this.props
      const houses = this.state.houses

        return (
          <div className={classes.root}>
              <Typography variant="h4" component="h4" className={classes.titleList}>
                All Houses
              </Typography>
              <div className={classes.rootHouse}>
                <CssBaseline />
                { houses.length > 0 ?
                  (
                    <GridList spacing={2} cellHeight={280} className={classes.gridList} cols={3}>
                      { houses.map((house, i) => (
                        <GridListTile key={i} className={classes.tile}>
                          <Link to={"/house/"+house._id}><img className={classes.image} src={'/api/house/image/'+house._id} alt={house.name} /> </Link>
                          <GridListTileBar className={classes.tileBar}
                            title={<Link to={"/house/"+house._id} className={classes.tileTitle}>{house.name}</Link>}
                            subtitle={ <span>$ {house.price} </span> }
                            actionIcon={ <Link to={"/house/"+house._id}>
                              <IconButton aria-label={`info about ${house.name}`} className={classes.icon}>
                                <InfoIcon />
                              </IconButton>
                            </Link> } />
                        </GridListTile>
                      ))}
                    </GridList>
                  ) : this.props.searched && (<Typography type="subheading" component="h4" className={classes.title}>No houses found!) :(</Typography>)}
              </div>
          </div>
        );
    }
}

export default withStyles(styles)(AdminPage);
