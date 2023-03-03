
const mongoose = require('mongoose');
const User = require('./Users');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  birthdate: { type: Date, required: true },
  observations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Observation' }]
});

const Patient = User.discriminator('Patient', patientSchema);

module.exports = Patient;
