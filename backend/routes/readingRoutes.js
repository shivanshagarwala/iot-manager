const express = require('express');
const { getReadings } = require('../controllers/readingController');

const router = express.Router();

router.get('/:deviceUid/readings/:parameter', getReadings);

// routes/readingRoutes.js
const { addTemperatureReading, addHumidityReading } = require('../controllers/readingController');
router.post('/:deviceUid/readings/temperature', addTemperatureReading);
router.post('/:deviceUid/readings/humidity', addHumidityReading);
//added

module.exports = router;


