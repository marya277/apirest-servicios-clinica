
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

async function getDoctorById(req, res) {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('observations');
    if (!doctor) {
      throw new Error('Médico no encontrado');
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Médico no encontrado' });
  }
}

async function getAllDoctors(req, res) {
  try {
    const doctors = await Doctor.find().populate('observations');
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de médicos' });
  }
}

async function updateDoctor(req, res) {
  try {
    const { id } = req.params;
    const { name, address, services } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(
      id,
      { name, address, services },
      { new: true }
    );
    if (!doctor) {
      throw new Error('Médico no encontrado');
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la información del médico' });
  }
}

async function changePassword(req, res) {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    const user = await Patient.findById(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      throw new Error('Contraseña incorrecta');
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function addObservation(req, res) {
  try {
    const { id } = req.params;
    const { observation } = req.body;
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      throw new Error('Médico no encontrado');
    }
    const patient = await Patient.findById(observation.patientId);
    if (!patient) {
      throw new Error('Paciente no encontrado');
    }
    const { title, description } = observation;
    const patientObservation = await createObservation(req, res);
    const newObservation = {
      doctorId: req.params.id,
      patientId: observation.patientId,
      description,
      healthStatus: observation.healthStatus,
      patientObservation: patientObservation._id 
    };
    const observationRecord = new Observation(newObservation);
    await observationRecord.save();
    doctor.observations.push(observationRecord);
    await doctor.save();
    patient.observations.push(observationRecord);
    await patient.save();
    res.status(201).json(observationRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar la observación médica' });
  }
}
module.exports={
getDoctorById,
getAllDoctors,
updateDoctor,
changePassword,
addObservation
}

