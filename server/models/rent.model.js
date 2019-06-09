import mongoose from 'mongoose';
import crypto from 'crypto';

const ForRentSchema = new mongoose.Schema(
    {
    name: {
      type: String,
      trim: true,
      required: "Name is required"
    },
    about: {
      type: String,
      trim: true,
      required: "description is required"
    },
    image: {
      data: Buffer,
      contentType: String
    },
    price: {
      type: Number,
      required: 'Price is required'
    },
    catergory: {
      type: String,
      trim: true,
      required: "Is it for sale or rent?"
    },
    location: {
      type: String,
      trim: true,
      unique: "Location already exists",
      required: "Location is required"
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: Date
  });



export default mongoose.model('ForRent', ForRentSchema);
