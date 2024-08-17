const mongoose = require('mongoose');

const humidityReadingSchema = new mongoose.Schema({
  deviceUid: { type: String, required: true },
  value: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('HumidityReading', humidityReadingSchema);
