const mongoose = require('mongoose');

const slugify = require('slugify');
const validator = require('validator');

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A car must have name'],
      trim: true,
      minlength: 1,
      maxlength: 10,
    },
    brand: {
      type: String,
      required: [true, 'A car must have brand'],
    },
    type: {
      type: String,
      enum: ['diesel', 'petrol', 'cng'],
      default: 'petrol',
    },
    slug: String,
    numberOfSeats: {
      type: Number,
      min: 1,
      max: 255,
      default: 5,
    },
    transmission: {
      type: String,
      enum: ['Manual', 'Automatic'],
      default: 'Manual',
    },
    airConditioner: {
      type: Boolean,
      default: true,
    },
    description: String,
    ratingsAverage: {
      type: Number,
      default: 4.7,
      min: [1.0, 'rating must be above 1.0'],
      max: [5.0, 'rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    price: {
      type: Number,
      required: true,
    },
    imageCover: {
      type: String,
      required: true,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

carSchema.index({ price: 1, ratingsAverage: -1 });
carSchema.index({ slug: 1 });

carSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
