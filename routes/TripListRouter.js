const { Router } = require("express");
const { User, Location, TripList, sequelize } = require("../models");
const { restrict } = require('../services/auth')

const { hashPassword, genToken, checkPassword } = require("../services/auth");

const tripListRouter = Router({ mergeParams: true });

// Route for all trip list user owns
tripListRouter.get("/", async (req, res, next) => {
  const triplists = await TripList.findAll();
  res.json({ triplists });
});

// get trip list by pk
tripListRouter.get("/:id", async (req, res) => {
  console.log(req.dataValues)
  const id = req.params.id;
  const triplists = await TripList.findAll({
    where: {
      id: id
    }
  });
  res.json({ triplists });
});

// Get current trip id
tripListRouter.get("/id/:id", async (req, res) => {
  const id = req.params.id;
  const tripById = await TripList.findByPk(id)
  console.log(tripById)
  res.json({ tripById });
});

// create new trip list
tripListRouter.post("/", async (req, res) => {
  const data = req.body;
  const userId = req.params.userId;
  const user = await User.findByPk(userId);
  const triplist = await TripList.create(data);
  triplist.setUser(user);
  res.json({ triplist });
});

// Update trip list
tripListRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log(req.body)
  const triplist = await TripList.findByPk(id);
  await triplist.update(data);
  res.json({ triplist });
});

// delete
tripListRouter.delete("/:id", async (req, res, next) => {

  const id = req.params.id;
  const triplist = await TripList.findByPk(id);
  try {
    const post = await triplist.destroy();
    res.json(triplist);
  } catch (e) {
    next(e);
  }
});

module.exports = tripListRouter;
