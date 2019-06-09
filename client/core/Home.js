import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import house from '../assets/images/house.jpg';
import {Link} from 'react-router-dom';
import { Grid, Paper} from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Row, Column} from "@material-ui/core";

const styles = (theme) => ({
  card: {
    maxWidth: 1200,
    margin: theme.spacing(5)
  },
  small: {
    maxWidth: 200,
    margin: theme.spacing(3)
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(3)}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 500
  }
})

class Home extends Component {
  state = {
    house : [{
      title: 'morgan',
      description: 'morgan\'s house 1',
      image: 1
    },
    {
      title: 'morgan',
      description: 'morgan\'s house 2',
      image: 2
    },
    {
      title: 'morgan',
      description: 'morgan\'s house 3',
      image: 3
    }
  ]
  }
  render() {
    const houses = this.state.house
    const {classes} = this.props
    return (
      <div>
        <Card className = {classes.card}>
          <CardMedia className = {classes.media} image = {house} title ="House sample 1"/>
          <CardContent>
            <Typography type = "body1" component = "p">
              Welcome to BYARENT
            </Typography>
          </CardContent>
        </Card>
        <div style={{ marginTop: 20, padding: 30, }}>
      <Grid container spacing={60} justify="center">
        {houses.map((house, i) => (
          <Grid item key={house.i}>
            <Card>
              <CardActionArea>
                <CardMedia component="img" alt="House sample" height="150" image={house.image}
                  title="Contemplative Reptile" />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    {house.title}
                  </Typography>
                  <Typography component="p">{house.description}</Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" disabled="true">
                  Price
                </Button>
                <Button size="small" color="primary">
                  See More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography type = "body1" component = "p">
        PARTNERSHIPS
      </Typography>
      <Typography type = "body1" component = "p">
        A Row goes here with three columns
      </Typography>
      <Typography type = "body1" component = "p">
        About BYARENT
        And a Youtube video
        A small description below the youtube video
      </Typography>
      <Typography type = "body1" component = "p">
        A footer here, another row
      </Typography>
    </div>
      </div>
    );
  }

}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home);
