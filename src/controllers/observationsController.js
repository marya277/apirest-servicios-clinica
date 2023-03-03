const Observation = require('../models/Observation');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Hospital = require('../models/Hospital');

async function createObservation(req, res) {
    const { doctorId, patientId, hospitalId, symptoms, diagnosis, prescription } = req.body;
    try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            res.status(404).json({ error: 'Médico no encontrado' });
            return;
        }
        const patient = await Patient.findById(patientId);
        if (!patient) {
            res.status(404).json({ error: 'Paciente no encontrado' });
            return;
        }
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            res.status(404).json({ error: 'Hospital no encontrado' });
            return;
        }
        const newObservation = {
            doctor,
            patient,
            hospital,
            symptoms,
            diagnosis,
            prescription
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
        res.status(500).json({ error: 'Error al crear la observación médica' });
    }
}

module.exports = { createObservation };
