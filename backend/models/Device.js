const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  uid: { type: String, unique: true, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model('Device', deviceSchema);
