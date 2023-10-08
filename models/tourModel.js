/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    duration:{
        type: Number,
        required: true, 
      },
      maxGroupSize:{
        type: Number,
        required: true, 
      },
      difficulty:{
        type: String,
        required: true, 
      },
    ratingsAverage: {
      type: String,
      default: 4.7,
    },
    ratingsQuantity:{
        type: Number,
        default: 0,
      },
    price: {
      type: Number,
      required: true,
    },

    priceDiscount: Number,
    summary:{
        type: String,
        trim: true,
    }, 
    description:{
        type: String,
        trim: true,
    }, 
    imageCover:{
        type: String,
        required: true,
    }, 
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;