//controllers for buying a house
import House from '../models/house.model.js';
import _ from 'lodash';
import errorHandler from '../helpers/dbErrorHandler';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';


//Handle POST request to create a house
const create = (req, res, next) => {
  let form = new formidable.IncomingForm()

  form.keepExtensions = true
  form.multiples = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Image could not be uploaded"
      })
    }
    let house = new House(fields)
    if (files.image) {
      house.image.data = fs.readFileSync(files.image.path)
      house.image.contentType = files.image.type
    }
    house.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(result)
    })
  })
}

//Find a house by Id field
const houseById = (req, res, next, id) => {
  House.findById(id).exec((err, house) => {
    if (err || !house) {
      return res.status('400').json({
        error: "House not found"
      })
    }
    req.house = house
    next();
  })
}

//Handle GET request for one houses
const read = (req, res) => {
  return res.json(req.house);
}

//Handle GET request for a list of all houses for admin
const list = (req, res, next) => {
  House.find({}, (err, houses) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json(houses)
  })
}

//Handle GET request for a list of all houses for sale
const listBuy = (req, res, next) => {
  House.find({catergory: 'For Sale'}, (err, houses) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json(houses)
  })
}

//Handle GET request for a list of all houses for rent
const listRent = (req, res, next) => {
  House.find({catergory: 'For Rent'}, (err, houses) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json(houses)
  })
}

// Get a few houses on the home page
const homeRent = (req, res, next) => {
  House.find({catergory: 'For Rent'}, (err, houses) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json(houses)
  }).sort({_id: -1}).limit(3)
}

// Get a few houses on the home page
const homeBuy = (req, res, next) => {
  House.find({catergory: 'For Sale'}, (err, houses) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json(houses)
  }).sort({_id: -1}).limit(3)
}

//Handle PUT request to update a house
const update = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields,files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded"
      })
    }
    let house = req.house
    house = _.extend(house, req.body);
    house.updated = Date.now();
    if (files.photo) {
      house.photo.data = fs.readFileSync(files.photo.path)
      house.photo.contentType = files.photo.type
    }
    house.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(house);
  })

  })
}

// Handle DELETE request for a house
const remove = (req, res, next) => {
  let house = req.house
  house.remove((err, deletedHouse) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(deletedHouse);
  })
}

//Setup route to retrieve Image URL
const image = (req, res, next) => {
  if(req.house.image.data){
    res.set("Content-Type", req.house.image.contentType);
    return res.send(req.house.image.data);
  }
  next();
}


export default { create, houseById, read, list, listBuy, listRent, homeRent, homeBuy, update, remove, image };
