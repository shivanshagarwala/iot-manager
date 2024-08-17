const mongoose = require('mongoose');
const dotenv = require('dotenv');
const TemperatureReading = require('./models/TemperatureReading');
const HumidityReading = require('./models/HumidityReading');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const simulateReadings = async () => {
  const deviceUid = process.env.Simulate_deviceID || 'device-uid-example';

  setInterval(async () => {
    const temperatureValue = Math.random() * 10 + 20; // Random temperature between 20-30
    const humidityValue = Math.random() * 10 + 50; // Random humidity between 50-60

    const tempReading = new TemperatureReading({
      deviceUid,
      value: temperatureValue,
      timestamp: new Date(),
    });

    const humReading = new HumidityReading({
      deviceUid,
      value: humidityValue,
      timestamp: new Date(),
    });

    await tempReading.save();
    await humReading.save();

    console.log(`Added temperature: ${temperatureValue}, humidity: ${humidityValue}`);
  }, 10000); // Every 10 seconds
};

simulateReadings();
