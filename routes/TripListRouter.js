const { Router } = require("express");
const { User, Location, TripList, sequelize } = require("../models");
const { hashPassword, genToken, checkPassword } = require("../services/auth");

const tripListRouter = Router({ mergeParams: true });

// Route for all trip list user owns
tripListRouter.get('/', async (req, res) => {
  const tripList = await TripList.findAll();
  res.json({tripList})
})

module.exports = tripListRouter;
