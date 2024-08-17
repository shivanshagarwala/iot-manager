const Device = require('../models/Device');

// Create Device
exports.createDevice = async (req, res) => {
  const { uid, name } = req.body;
  try {
    const newDevice = new Device({ uid, name });
    await newDevice.save();
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Device
exports.deleteDevice = async (req, res) => {
  const { deviceUid } = req.params;
  try {
    await Device.deleteOne({ uid: deviceUid });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve Device
exports.getDevice = async (req, res) => {
  const { deviceUid } = req.params;
  try {
    const device = await Device.findOne({ uid: deviceUid });
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ message: 'Device not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List all Devices
exports.listDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
