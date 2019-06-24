import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline'

import {create} from './api-house.js';

const styles = theme => ({
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  container: {
    display: 'inline center',
    flexWrap: 'wrap'
  },
  input: {
    display: 'none'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  error: {
    verticalAlign: 'middle'
  },
  filename:{
    marginLeft:'10px'
  }
});


class CreateHouse extends Component {
  state = {
    image: [],//[]
    name: '',
    about: '',
    price: '',
    catergory: '',
    bedrooms: '',
    garage: '',
    reference: '',
    location: '',
    redirect: false,
    error: ''
  }

  componentDidMount = () => {
    this.houseData = new FormData()
  }

  handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    this.houseData.set(name, value)
    this.setState({ [name]: value });
  }

  clickSubmit = () => {
    create(this.houseData).then((data) => {
      if (data.error) {
        this.setState({error: data.error});
      } else {
        this.setState({'houseId': data._id, redirect: true});
      }
    })
  }

  render() {
    const {classes} = this.props

    if (this.state.redirect) {
      return (<Redirect to={'/house/'+this.state.houseId} />)
    }

    return (
      <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
        <CssBaseline />
        <Typography variant="h5" component="h2" align="center" className={classes.title} gutterBottom>
            New House
          </Typography>
          <br/>
        <form container className={classes.container} autoComplete="off">
          <input accept="image/*" onChange={this.handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
           <label htmlFor="icon-button-file">
             <Button variant="raised" color="secondary" component="span">
                 Upload image
                 <i class="material-icons">file_upload</i>
               </Button>
          </label> <span className={classes.filename}>{this.state.image ? this.state.image.name : ''}</span><br/>
          <br/>
          <TextField id="name" label="Name" className={classes.textField} value={this.state.name}
            onChange={this.handleChange('name')} margin="normal" />
          <br/>
          <TextField id="about" label="About House" multiline value={this.state.about}
            onChange={this.handleChange('about')} className={classes.textField} margin="normal" />
          <br/>
            <TextField required id="price" label="Price" className={classes.textField} value={this.state.price}
              onChange={this.handleChange('price')} margin="normal" />

            <TextField required id="catergory" label="For Sale or For Rent" className={classes.textField} value={this.state.catergory}
              onChange={this.handleChange('catergory')} margin="normal" />
            <br/>
          <TextField id="bedrooms" label="Number of Bedrooms" className={classes.textField} value={this.state.bedrooms}
            onChange={this.handleChange('bedrooms')} margin="normal" />

          <TextField id="garage" label="Number of Garage" value={this.state.garage} className={classes.textField}
            onChange={this.handleChange('garage')} margin="normal" />
          <br/>
          <TextField id="reference" label="Reference" className={classes.textField} value={this.state.reference}
            onChange={this.handleChange('reference')} margin="normal" />

          <TextField id="location" label="Location" className={classes.textField} value={this.state.location}
            onChange={this.handleChange('location')} margin="normal" />
        </form>
        <br/>
          {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}</Typography>)
          }
        <Button  style={{marginTop:16}} variant="contained" color="primary" onClick={this.clickSubmit} className={classes.submit}>Create</Button>
      </div>

    );
  }
}

export default withStyles(styles)(CreateHouse)
