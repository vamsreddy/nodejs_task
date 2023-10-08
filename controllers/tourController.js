/* eslint-disable prettier/prettier */
const Tour = require('./../models/tourModel');

exports.getAllTours = async(req, res) => {
  try{
    //// BUILD query 
    ////// 1) Filtering....
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    /////// 2) Advanced Filtering....
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = Tour.find(JSON.parse(queryStr));
    /////one of the mongoose method
    // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');

    /////mongo DB method
    // const tours = await Tour.find(
    //   {
    //     difficulty: 'easy',
    //     duration: 5
    //   }
    // )
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data:{
        tours,
      },
    });
  }catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Tours was not found',
    });
  }
};

exports.getTour = async(req, res) => {
  try{
    const tour = await Tour.findById(req.params.id)
    // Tour.findByOne({_id: req.params.id})
    res.status(200).json({
      status: 'success',
      data:{
        tour,
      },
    });
  }catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Tour was not found',
    });
  }
  
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Tour was not created',
    });
  }
};

exports.updateTour = async(req, res) => {
  try{
    const tour = await Tour.findByIdAndUpdate(req.params.id , req.body,{
      new: true , 
      runValidators: true,
    })

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }catch(err) {
    res.status(400).json({
      status: 'fail',
      message: 'Tour was not updated',
    });
  }
  
};

exports.deleteTour = async (req, res) => {
  try{
    const tour = await Tour.findByIdAndDelete(req.params.id )

    res.status(200).json({
      status: 'success',
    });
  }catch(err) {
    res.status(400).json({
      status: 'fail',
      message: 'Tour was not deleted',
    });
  }
  
};
