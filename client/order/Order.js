import React, {Component} from 'react';
import {Card, CardContent, CardMedia, Typography, Grid, Divider} from '@material-ui/core'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/styles'
import {Link} from 'react-router-dom'

import {read} from './api-order.js'

const styles = theme => ({
  card: {
    textAlign: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    flexGrow: 1,
    margin: 15,
  },
  cart: {
    textAlign: 'left',
    width: '100%',
    display: 'inline-flex'
  },
  content: {
    flex: '1 0 auto',
    padding: '16px 8px 0px'
  },
  cover: {
    width: 500,
    height: 250,
    margin: '8px'
  },
  thanks:{
    color: '#fff',
    fontStyle: 'italic'
  },
  innerCardItems: {
    textAlign: 'left',
    margin: '24px 24px 24px 24px',
    padding: '24px 20px 40px 20px',
    backgroundColor: '#37474f'
  },
  innerCard: {
    textAlign: 'left',
    margin: '24px 24px 24px 10px',
    padding: '30px 45px 40px 45px',
    backgroundColor: '#37474f'
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  subheading: {
    marginTop: theme.spacing(),
    color: "#4db6ac"
  },
  checkout: {
    float: 'right',
    margin: theme.spacing(4)
  },
  total: {
    fontSize: '1.2em',
    color: '#fff',
    marginRight: '16px',
    fontWeight: '600',
    verticalAlign: 'bottom'
  }
})

class Order extends Component {
  constructor({match}) {
    super()
    this.state = {
      order: '',
      house: ''
    }
    this.match = match
  }

  componentDidMount = () => {
    read({
      orderId: this.match.params.orderId
    }).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({order: data})
        this.setState({house: this.state.order.houses})
      }
    })
  }

  render() {
    const {classes} = this.props
    const order = this.state.order
    const house = this.state.house

    return (
      <Card className={classes.card}>
        <Typography variant="h2" component="h4" className={classes.title}>
          Order Details
        </Typography>
        <Typography variant="h6" component="h6" className={classes.subheading}>
            Order Code: <strong>{order._id}</strong> <br/> Placed on {(new Date(order.created)).toDateString()}
        </Typography><br/>
        <Grid container spacing={8}>
          <Grid item xs={7} sm={7}>
            <Card className={classes.innerCardItems}>
              <Card className={classes.cart} >
                <CardMedia className={classes.cover} image={'/api/house/image/'+house._id} title={house.name} />
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Link to={'/house/'+house._id}>
                      <Typography component="h3" className={classes.productTitle} color="primary">
                        {house.name}
                      </Typography>
                    </Link>
                    <Typography type="subheading" component="h3" className={classes.itemShop} color="primary">
                      Price: $ {house.price}
                    </Typography>
                  </CardContent>
                </div>
              </Card>
              <Divider/>
              <div className={classes.checkout}>
                <span className={classes.total}>Total: ${house.price}</span>
              </div>
              </Card>
            </Grid>
            <Grid item xs={5} sm={5}>
              <Card className={classes.innerCard}>
                <Typography type="subheading" component="h3" className={classes.thanks} color="primary">
                  Thank you for shopping with us! <br/>You can track the status of your orders on your favourite page.
                </Typography>
              </Card>
            </Grid>
        </Grid>
      </Card>
    )
  }
}

Order.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Order)
