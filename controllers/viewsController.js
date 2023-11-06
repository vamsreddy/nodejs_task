// const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Car = require('../models/carModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  ////1) get car data from collection
  const cars = await Car.find();

  ////2) build template

  ////3) render that template using car data from 1)
  res.status(200).render('overview', {
    title: 'All Cars',
    cars,
  });
});

exports.getCar = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested car (including reviews and guides)
  const car = await Car.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!car) {
    return next(new AppError('There is no car with that name.', 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('car', {
    title: `${car.name} Car`,
    car,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account',
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  res.status(200).render('account', {
    title: 'Your Account',
    user: updatedUser,
  });
});
