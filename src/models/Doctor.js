
const mongoose = require('mongoose');
const User = require('./Users');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  services: { type: String, required: true },
  observations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Observation' }]
});

const Doctor = User.discriminator('Doctor', doctorSchema);

module.exports = Doctor;
