const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Car = require('../models/carModel');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const car = await Car.findById(req.params.carId);

  const session = await stripe.checkout.sessions.create({
    // payment_method_types: ['card'],
    // success_url: `${req.protocol}://${req.get('host')}/`,
    // cancel_url: `${req.protocol}://${req.get('host')}/car/${car.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.carId,
    line_items: [
      {
        // name: `${car.name} Car`,
        // description: car.description,
        // images: [`http://127.0.0.1:3000/img/cars/${car.imageCover}`],
        // amount: car.price * 100,
        // currency: 'usd',
        price: 'price_1O7HEeSEDWgLfdYjw3cep6iI',
        quantity: 1,
      },
    ],
    mode: 'card',
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/car/${car.slug}`,
  });
  res.status(200).json({
    status: 'success',
    session,
  });
});
