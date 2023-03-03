
const Hospital = require('../models/Hospital');
const Doctor = require('../models/Doctor');
const Observation = require('../models/Observation');

async function getAllHospitals(req, res) {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los hospitales' });
  }
}

async function getHospitalById(req, res) {
  try {
    const { hospitalId } = req.params;
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      throw new Error('Hospital no encontrado');
    }
    res.status(200).json(hospital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el hospital' });
  }
}

async function createObservation(req, res) {
  try {
    const { patientId } = req.params;
    const { title, description } = req.body;

    const currentUser = req.user;

    const isDoctor = await Doctor.exists({ _id: currentUser._id });
    if (!isDoctor) {
      throw new Error('Solo los médicos pueden crear observaciones médicas');
    }

    const newObservation = new Observation({
      title,
      description,
      patient: patientId,
      doctor: currentUser._id,
    });
    const savedObservation = await newObservation.save();

    res.status(201).json(savedObservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la observación médica' });
  }
}

async function getObservationsForPatient(req, res) {
  try {
    const { patientId } = req.params;

    const currentUser = req.user;

    const isHospital = await Hospital.exists({ _id: currentUser._id });
    if (!isHospital) {
      throw new Error('Solo los hospitales pueden ver las observaciones médicas');
    }

    const observations = await Observation.find({ patient: patientId }).populate('doctor');

    res.status(200).json(observations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las observaciones médicas' });
  }
}

module.exports = {
  getAllHospitals,
  getHospitalById,
  createObservation,
  getObservationsForPatient,
};
