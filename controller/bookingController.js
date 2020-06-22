const Booking = require('./../models/bookingModel');
const Tournament = require('./../models/tournamentModel')
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");


exports.createBooking = catchAsync(async(req,res,next) => {
  if(!req.body.tournament) req.body.tournament = req.params.tournamentId;
  if(!req.body.user) req.body.user = req.user.id ;

  const newBooking = await Booking.createOne(req.body)

  res.status(201).json({
      message : "booking is successful",
      data : newBooking
  })

})

// exports.isAvailable = (req,res,next) => {
//   const bookingTournmentDeadline = await Tournament.findOne(req.params.tournamentId).select("+deadline")
// }