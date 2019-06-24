import mongoose from 'mongoose';
import crypto from 'crypto';


const HouseSchema = new mongoose.Schema(
    {
      image: {
          data: Buffer,
          contentType: String
        },
      name: {
        type: String,
        trim:true,
        required: "Name is required"
      },
      about: {
        type: String,
        trim: true,
        required: "description is required"
      },
      price: {
        type: Number,
        required: 'Price is required'
      },
      catergory: {
        type: String,
        trim: true,
        required: "Is it for sale or rent?",
        enum: ["For Sale", "For Rent"]
      },
      bedrooms: {
        type: Number,
        required: "Number required"
      },
      garage: {
        type: Number,
        default: 1,
      },
      reference: {
        type: Number
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



export default mongoose.model('House', HouseSchema);
