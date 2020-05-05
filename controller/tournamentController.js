const Tournament = require("../models/tournamentModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllTournament = catchAsync(async (req, res, next) => {
  
  //filtering
  let queryObj = { ...req.query };
  
  let excludedFields = ["page", "sort", "limit", "field"];

  excludedFields.forEach(el => {
    delete queryObj[el];
  });
  //advance filtiering
 
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

  let query = Tournament.find(JSON.parse(queryStr));
  
  //sorting
  if (req.query.sort) {
    query = query.sort(req.query.sort);
  } 

  //selecting field
  if (req.query.field) {
    const selectedField = req.query.field.split(",").join(" ");
    query = query.select(selectedField);
  } else {
    query = query.select("-__v");
  }
  //pagination

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
 
  if (req.query.page) {
    const numTours = await Tournament.countDocuments();
    if (skip >= numTours) return next(new AppError("page doesn't exist", 400));
  }

  const tournament = await query;
  if(!tournament.length){
    return next(new AppError('tournament not found',400))
  }
  res.status(201).json({
    status: "success",
    result: tournament.length,
    data: {
      tournament
    }
  });
});


exports.getTournament = catchAsync(async (req, res,next) => {
  const tournament = await Tournament.find({ _id: req.params.id });
  
  if(!tournament.length){
    return next(new AppError('tournament not found'))
  }
  res.status(201).json({
    status: 'success',
    data: {
      tournament
    }
  });
});

exports.createTournament = catchAsync(async (req, res, next) => {
  const tournament = await Tournament.create(req.body);
 
  res.status(200).json({
    status: "success",
    data: {
      tournament
    }
  });
});
exports.deleteTournament = catchAsync(async (req, res, next) => {
  const deletedTournament = await Tournament.deleteOne({ _id: req.params.id });

  if (!deletedTournament)
    return next(new AppError("tournament with this id does not exist"));
  res.status(201).json({
    status: "success",
    message: "tournament is deleted"
  });
});

exports.updateTournament = catchAsync(async (req, res, next) => {
  const updatedTournament = await Tournament.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status:'success',
    message:'tournament is updated',
    updateTournament
  })
});
