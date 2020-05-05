const express = require("express");
const tournamentController = require("./../controller/tournamentController");
const authController = require('./../controller/authController')

const router = express.Router();

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
