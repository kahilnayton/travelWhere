const express = require('express');
const PORT = process.env.PORT || 3001;
const TripListRouter = require('./routes/TripListRouter');
const LocationsRouter = require('./routes/LocationsRouter');
const userRouter = require('./routes/UserRouter');

const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

// routes 
app.use('/auth', userRouter);

// Error handler 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
})

// Router handler
app.use('/tripLists', TripListRouter);
app.use('/tripLists/:tripListId/locations', LocationsRouter);
app.use('/users/:userId/tripLists/', TripListRouter);
// app.use('/tripLists/:tripListsId/locations/', LocationsRouter);

app.listen(PORT, () => {
  console.log(`Express server listening on port${PORT}`);
});