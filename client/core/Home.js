import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Card, CardMedia, CardContent, Typography, Grid, Paper,
        CardActionArea, CardActions, Button } from '@material-ui/core';
import house from '../assets/images/house1.jpg';
import loading from '../assets/images/loading.gif'
import {Link} from 'react-router-dom';
import ReactPlayer from 'react-player';

import { homeBuy, homeRent } from '../houses/api-house';

const styles = theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
   paddingTop: 10,
   marginLeft: theme.spacing(1),
   marginRight: theme.spacing(2)
 },
 loading: {
   paddingTop: 10,
   marginLeft: theme.spacing(10)
 },
 cardContent: {
    flexGrow: 1,
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(3)}px`,
    color: theme.palette.text.secondary
  },
  media: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    minHeight: 500
  },
  mainPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    margin: theme.spacing(4)
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    }},
    playerWrapper: {
      position: 'relative',
      paddingTop: '25%'
    },
  reactPlayer: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  textOverlay: {
    position: 'absolute',
    top: '110px',
    left: '40px',
    width: '80%',
    height: '60%',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,.3)'
  }
})

class Home extends Component {
  state = {
    rentHouses: [],
    buyHouses: [],
    _loading: false
  }

  componentDidMount() {
    this.setState({_loading: true})
    homeRent().then((data) => {
      if (data.error) {
        console.log(data.error);
      }
      else {
        this.setState({ rentHouses: data, _loading: false });
      }
    })
    homeBuy().then((data) => {
      if (data.error) {
        console.log(data.error);
      }
      else {
        this.setState({ buyHouses: data})
      }
    })
  }

  render() {
    const rentHouses = this.state.rentHouses
    const buyHouses = this.state.buyHouses
    const {classes} = this.props

    return (
      <div>
        <CssBaseline />
        <Card className = {classes.card}>
          <CardMedia className = {classes.media} image = {house} title ="Home page"/>
            <div className={classes.textOverlay}>
              <Typography gutterBottom variant="h2" component="h4" align="center">
                Get affordable houses with BUYRENT
              </Typography>
              <Typography variant="h5" component = "h6" gutterBottom align="center">
                Browse, select and click to get your dream house
              </Typography>
           </div>
          <CardContent>
            <Typography type = "body1" component = "h5" gutterBottom>
              BYARENT
            </Typography>
          </CardContent>
        </Card>

        <Paper className={classes.mainPost}>
            <div className={classes.overlay} />
            <Grid container>
              <Grid item md={8}>
                <div className={classes.mainPostContent}>
                  <Typography component="h2" variant="h4" color="inherit" gutterBottom>
                    This is what BUYRENT is about
                  </Typography>
                  <Typography variant="h6" color="inherit" paragraph>
                    BYARENT is a home buying platform.It allows potential homeowners to view houses and buy
                      preferred on. Edison is the owner of the platform and want to revamp up user experience of the
                      platform.He has hired you create an appealing site that the users will find easy to use.
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
        <br/>
        <br/>
      <Typography className={classes.title} component="h3" variant="h5" align="left" color="textPrimary" gutterBottom>
        Latest Houses For Rent
      </Typography>
      <Grid container spacing={3}>
        {this.state._loading ? <img alt='loading' src={loading} className={classes.loading}/> : rentHouses.map((house, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia className={classes.cardMedia} component="img"  height="280" image={'/api/house/image/'+house._id}
                  title={house.title} />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {house.title}
                  </Typography>
                  <Typography>{house.name}</Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid container spacing={10}>
                <Grid item>
                  <Button variant="outlined" color="primary" disabled={true}>
                    $ {house.price}
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="primary">
                    <Link to={"/house/"+house._id} className={classes.tileTitle}>SEE MORE</Link>
                  </Button>
                </Grid>
              </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <br/>
      <br/>
      <Typography className={classes.title} component="h3" variant="h5" align="left" color="textPrimary" gutterBottom>
        Latest Houses For Sale
      </Typography>
      <Grid container spacing={3}>
        {this.state._loading ? <img alt='loading' src={loading} className={classes.loading}/> : buyHouses.map((house, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia className={classes.cardMedia} component="img"  height="280" image={'/api/house/image/'+house._id}
                  title={house.title} />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {house.title}
                  </Typography>
                  <Typography>{house.name}</Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid container spacing={10}>
                <Grid item>
                  <Button variant="outlined" color="primary" disabled={true}>
                    $ {house.price}
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="primary">
                    <Link to={"/house/"+house._id} className={classes.tileTitle}>SEE MORE</Link>
                  </Button>
                </Grid>
              </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <br/>
      <br/>
      <Paper className={classes.mainPost}>
          <div className={classes.overlay} />
          <Grid container>
            <Typography component="h2" variant="h4" color="inherit" gutterBottom>
              PARTNERSHIPS
            </Typography>
            <Grid item md={3}>
              <div className={classes.mainPostContent}>
                <Typography component="h2" variant="h4" color="inherit" gutterBottom>
                  Outbox
                </Typography>
                <Typography variant="h6" color="inherit" paragraph>
                  In partnership with UNFPA and the Government of Uganda, we are running multiple innovation challenges that seek to support young people establish social businesses
                </Typography>
              </div>
            </Grid>
            <Grid item md={3}>
              <div className={classes.mainPostContent}>
                <Typography component="h2" variant="h4" color="inherit" gutterBottom>
                  Outbox
                </Typography>
                <Typography variant="h6" color="inherit" paragraph>
                  In partnership with UNFPA and the Government of Uganda, we are running multiple innovation challenges that seek to support young people establish social businesses
                </Typography>
              </div>
            </Grid>
            <Grid item md={3}>
              <div className={classes.mainPostContent}>
                <Typography component="h2" variant="h4" color="inherit" gutterBottom>
                  Outbox
                </Typography>
                <Typography variant="h6" color="inherit" paragraph>
                  In partnership with UNFPA and the Government of Uganda, we are running multiple innovation challenges that seek to support young people establish social businesses
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Paper>
        <br/>
        <br/>
      </div>
    );
  }

}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home);
