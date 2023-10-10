/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const slugify = require('slugify');
// eslint-disable-next-line no-unused-vars
const validator = require('validator');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true,'A tour must have name'],
      unique: true,
      trim: true,
      maxlength: [40 , 'A tour must have less than 40 letters'],
      minlength: [10 , 'A tour must have more than 10 letters'],
      // validate: [validator.isAlpha , 'name should only contain alphabtes'],
    },
    slug: String,
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
        enum:{
          values: ['easy' , 'medium', 'difficult'],
          message: 'Difficulty is either: easy , medium , difficulty'
        }
      },
    ratingsAverage: {
      type: Number,
      default: 4.7,
      min: [1.0 , 'rating must be above 1.0'],
      max: [5.0 , 'rating must be below 5.0'],
    },
    ratingsQuantity:{
        type: Number,
        default: 0,
      },
    price: {
      type: Number,
      required: true,
    },

    priceDiscount:{
      type: Number,
      validate:{
        validator: function(val) {
          ///this. will not work for update
          return val < this.price
        },
        message: 'discount price ({VALUE}) should be below regular price'
      }
    },
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
        select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    }
},
{
  toJSON: { virtuals: true},
  toObject: { virtuals: true}
}
);

tourSchema.virtual('durationWeeks').get(function(){
  return this.duration / 7;
});

//////////DOCUMENT MIDDLEWARE runs before .save() and .cerate()
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, {lower: true});
  next();
});

tourSchema.pre(/^find/, function(next) {
  this.find ({secretTour: { $ne: true}});
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;