const TemperatureReading = require('../models/TemperatureReading');
const HumidityReading = require('../models/HumidityReading');

// Get Readings
exports.getReadings = async (req, res) => {
  const { deviceUid, parameter } = req.params;
  const { start_on, end_on } = req.query;

  try {
    let readings;

    if (parameter === 'temperature') {
      readings = await TemperatureReading.find({
        deviceUid,
        timestamp: { $gte: new Date(start_on), $lte: new Date(end_on) },
      });
    } else if (parameter === 'humidity') {
      readings = await HumidityReading.find({
        deviceUid,
        timestamp: { $gte: new Date(start_on), $lte: new Date(end_on) },
      });
    } else {
      return res.status(400).json({ message: 'Invalid parameter' });
    }

    res.json(readings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Add Temperature Reading
exports.addTemperatureReading = async (req, res) => {
  const { deviceUid } = req.params;
  const { value, timestamp } = req.body;

  try {
    const newReading = new TemperatureReading({
      deviceUid,
      value,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    });

    await newReading.save();
    res.status(201).json(newReading);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Humidity Reading
exports.addHumidityReading = async (req, res) => {
  const { deviceUid } = req.params;
  const { value, timestamp } = req.body;

  try {
    const newReading = new HumidityReading({
      deviceUid,
      value,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    });

    await newReading.save();
    res.status(201).json(newReading);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
