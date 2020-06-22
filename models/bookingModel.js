const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  tournament: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
    required: [true, "Booking must belongs to a Tour!"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Booking must belongs to a User!"],
  },
  price: {
    type: Number,
    require: [true, "Booking must have a price."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  membersName:[String]
 
});

bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate("tournament");
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
