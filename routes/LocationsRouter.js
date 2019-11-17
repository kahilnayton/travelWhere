const { Router } = require('express');
const { Location, TripList } = require('../models');
const locations = Router({ mergeParams: true });

locations.get('/', async (req, res) => {
  const triplistId = req.params.tripListId;
  const locations = await Location.findAll({ where: { triplistId } })
  res.json({locations})
}) 

locations.get('/:id', async (req, res) => {
  const id = req.params.id;
  const location = await Location.findByPk(id)
  res.json({location})
})

locations.post('/', async (req, res, next) => {
  try {
    const id = req.params.tripListId;
    const data = req.body;
    if (data.departure_date === '') data.departure_date = null;
    if (data.return_date === '') data.return_date = null;
    const triplist = await TripList.findByPk(id);
    console.log(data);
    const location = await Location.create(data)
    location.setTriplist(triplist);
    res.json({ location })
    
  } catch (e) {
    next(e)
  }
})

locations.put('./:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const location = await Location.findByPk(id)
  await location.update(data)
  res.json({location})
})

locations.delete('./:id', async (req, res) => {
  await Location.destroy({
    where: { id: req.params.id}
  })

  res.json({
    message: 'You removed a localtion'
  })
})

module.exports = locations;