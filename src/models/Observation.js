const mongoose = require('mongoose');

const observationSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  symptoms: { type: String, required: true },
  diagnosis: { type: String, required: true },
  prescription: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Observation = mongoose.model('Observation', observationSchema);

module.exports = Observation;
