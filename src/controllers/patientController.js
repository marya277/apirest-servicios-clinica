const Patient = require('../models/Patient');

// Obtener todos los pacientes
async function getAllPatients(req, res) {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los pacientes' });
  }
}

// Obtener un paciente por su ID
async function getPatientById(req, res) {
  const { patientId } = req.params;
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      res.status(404).json({ error: 'Paciente no encontrado' });
      return;
    }
    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el paciente' });
  }
}

async function createObservation(req, res) {
  const { patientId } = req.params;
  const { title, description } = req.body;
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      res.status(404).json({ error: 'Paciente no encontrado' });
      return;
    }
    patient.observations.push({ title, description });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la observación médica' });
  }
}

async function getObservationsForPatient(req, res) {
  const { patientId } = req.params;
  try {
    const patient = await Patient.findById(patientId).populate('observations');
    if (!patient) {
      res.status(404).json({ error: 'Paciente no encontrado' });
      return;
    }
    res.json(patient.observations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las observaciones médicas' });
  }
}

module.exports = {
  getAllPatients,
  getPatientById,
  createObservation,
  getObservationsForPatient,
};
