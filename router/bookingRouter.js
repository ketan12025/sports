const express = require("express");

const router = express.Router({ mergeParams: true });
const bookingController = require("./../controller/bookingController");

router
  .route("/").post(bookingController.createBooking);
 // .get(bookingController.getAllBookings)
 

// router
//   .route("/:id")
//   .get(bookingController.getbooking)
//   .delete(bookingController.deleteBooking)
//   .update(bookingController.deleteBooking);

module.exports = router;
