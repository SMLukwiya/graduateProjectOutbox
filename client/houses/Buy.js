import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/styles';
import { Grid, Typography } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom';
import { GridListTile, GridListTileBar } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import {listBuy} from './api-house.js';

const styles = theme => ({
    root: {
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
    title: {
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

class Houses extends Component {
  state = {
    houses: []
  }

  componentDidMount() {
    listBuy().then((data) => {
      if (data.error) {
        console.log(data.error);
      }
      else {
        this.setState({ houses: data});
      }
    })
  }

  render() {
    const {classes} = this.props;
    const houses = this.state.houses;

    return (
      <div className={classes.root}>
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
      </div>)
  }
}

Houses.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Houses)
