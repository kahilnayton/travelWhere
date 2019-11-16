const express = require('express');
const PORT = process.env.PORT || 3001;
const travelListRouter = require('')
const ListRouter = require('');

const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
app.use(cors());
app.use(kogger('dev'));
app.use(bodyParser.json());

// routes 
app.use('/auth', userRouter);

// Error handler 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
})

// Router handler
app.use('/travelList', travelListRouter);
app.use('/travelList/:travelListId/location', travelRouter);
app.use('/user/:userId/travelList/', travelListRouter);

app.listen(PORT, () => {
  console.log(`Express server listening on port${PORT}`);
});