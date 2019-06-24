var mongoose = require('mongoose');
import crypto from 'crypto';

const OrderSchema = new mongoose.Schema(
  {
    houses: {type: mongoose.Schema.ObjectId, ref: 'House'},
    name: {
      type: String,
      trim: true,
      required: 'Name is required!'
    },
    email: {
      type: String,
      trim: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
      required: 'Email is required'
    },
    updated: Date,
    created: {
      type: Date,
      default: Date.now
    },
    user: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

export default mongoose.model('Order', OrderSchema)
