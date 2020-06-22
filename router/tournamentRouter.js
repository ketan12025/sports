const express = require("express");
const tournamentController = require("./../controller/tournamentController");
const authController = require('./../controller/authController')
const bookingRouter = require('./../router/bookingRouter')

const router = express.Router();

router.use('/:tounamentId/booking',bookingRouter)
router
  .route("/")
  .get(tournamentController.getAllTournament)
  .post(tournamentController.createTournament);

router
  .route("/:id")
  .delete(tournamentController.deleteTournament)
  .get(tournamentController.getTournament)
  .patch(tournamentController.updateTournament);

module.exports = router;
