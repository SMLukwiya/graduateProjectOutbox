import User from '../models/user.model';
import admin from '../models/admin.model'; // admin name and password
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from '../../config/config';

//Handle Signin from user and authenticate a user.
const signin = (req, res) => {
  User.findOne({"email": req.body.email}, (err, user) => {
    if (err || !user) {
      return res.status('401').json({
        error: "User not found"
      })
    }
    if (!user.authenticate(req.body.password)) {
      return res.status('401').send({
        error: "Email and password don't match"
      })
    }
    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email }
    });
  })
}

// Admin Signin
const adminSignin = (req, res) => {
  if (admin.name === req.body.name && admin.password === req.body.password) {
    const token = jwt.sign({_id: admin._id}, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 9999});
    return res.json({
      token,
      admin: { _id: admin._id, name: admin.name }
    })
  }
  else {
    return res.json({error: 'Acess Denied'});
  }
}

//Handle Signout by user and remove token from session storage
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "Signed out"
  })
}

//Handle Signout by employee and remove token from session storage
const adminSignout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "Signed out"
  })
}

//check authorization
const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
})

//Grant access if authorized
const hasAuthorization = (req, res) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next();
}

export default { signin, adminSignin, signout, adminSignout, requireSignin, hasAuthorization };
