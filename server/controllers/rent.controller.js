//Controllers to handle renting houses
import ForRent from '../models/rent.model';
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
    let house = new ForRent(fields)
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
      res.json({result: "ok"})
    })
  })
}

//Find house by house Id
const houseById = (req, res, next, id) => {
  ForRent.findById(id).exec((err, house) => {
    if (err || !house) {
      return res.status('400').json({
        error: "House not found"
      })
    }
    req.profile = house
    next();
  })
}

//Handle GET request for a house
const read = (req, res) => {
  return res.json(req.profile);
}

// Handle GET request to list all houses
const list = (req, res, next) => {
  ForRent.find((err, houses) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json(houses)
  }).select('image price about name catergory location created updated');
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
    let house = req.profile
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

//Handle DELETE request for a house
const remove = (req, res, next) => {
  let house = req.profile
  house.remove((err, deletedHouse) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(deletedHouse);
  })
}

// Setup route to retrieve image URL
const image = (req, res, next) => {
  if(req.profile.image.data){
    res.set("Content-Type", req.profile.image.contentType);
    return res.send(req.profile.image.data);
  }
  next();
}


export default { create, houseById, read, list, update, remove, image };
