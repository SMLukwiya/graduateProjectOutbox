// Controllers for User
import User from '../models/user.model.js';
import _ from 'lodash';
import errorHandler from '../helpers/dbErrorHandler';

// Handle POST request to create a user
const create = (req, res, next) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      return status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json({
      message: "successfully signed up"
    })
  })
}

//Find user by ID
const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status('400').json({
        error: "user not found"
      })
    }
    req.profile = user
    next();
  })
}

//Handle GET request for a user
const read = (req, res) => {
  //Remove password and salt value when returning the user for safety
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
}

//Handle PUT request for a user
const update = (req, res, next) => {
  let user = req.profile;
  user = _.extend(uses, req.body);
  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  })
}

//Handle DELETE request for a user
const remove = (req, res, next) => {
  let user = req.profile
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  })
}

export default { create, userById, read, list, update, remove };
