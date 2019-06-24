import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardContent, Button,
        TextField, Icon, Typography } from '@material-ui/core';
import {withStyles} from '@material-ui/styles';
import {Redirect, Link} from 'react-router-dom';

import {signin} from './api-auth.js';
import auth from '../auth/auth-helper';

const styles = theme => ({
  card: {
    maxWidth: 600,
    height: 400,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(15),
    paddingBottom: theme.spacing(5)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  admin: {
    marginRight: theme.spacing(),
    color: theme.palette.openTitle
  }
})

class Signin extends Component {
  state = {
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false
  }

  clickSubmit = () => {
    const user = {
      email: this.state.email || undefined,
      password: this.state.password || undefined
    }
    signin(user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        auth.authenticate(data, () => {
          this.setState({redirectToReferrer: true})
        })
      }
    })
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  render() {
    const {classes} = this.props
    const {from} = this.props.location.state || { from: { pathname: '/cart' }}
    const {redirectToReferrer} = this.state

    if (redirectToReferrer) {
      return (<Redirect to={from}/>)
    }

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Sign In
          </Typography>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal"/>
          <br/> {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
        <Typography type="headline" component="h2" className={classes.title}>
          Create an account <Link to={'/signup'}>Sign Up</Link>
        </Typography>
        <Link to="/adminsignin">
          <Button color="primary" onClick={this.clickAdmin} className={classes.admin}>Admin</Button>
        </Link>
      </Card>
    )
  }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signin);
