const express = require('express');

const carController = require('../controllers/carController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(carController.aliasTopCars, carController.getAllCars);

router
  .route('/')
  .get(carController.getAllCars)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    carController.createCar,
  );

router
  .route('/:id')
  .get(carController.getCar)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    carController.uploadCarImages,
    carController.resizeCarImages,
    carController.updateCar,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    carController.deleteCar,
  );

module.exports = router;
