const { Router } = require('express');
const { Location, TripList } = require('../models');
const locations = Router({ mergeParams: true });

Locations.get('/', async (req, res) => {
  const tripListId = req.params.tripListId;
  const locations = await Location.findAll({ where: { tripListId } })
  res.json({locations})
}) 

module.exports = locations