
 
const mongoose = require('mongoose');
const User = require('./Users');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  services: { type: String, required: true },
  observations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Observation' }],
  doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }]
});

const Hospital = User.discriminator('Hospital', hospitalSchema);

module.exports = Hospital;
