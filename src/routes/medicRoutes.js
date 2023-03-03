const express = require('express');
const router = express.Router();

const doctorController = require('../controllers/medicController');

// Rutas para los endpoints
router.get('/doctors/:id', doctorController.getDoctorById);
router.get('/doctors', doctorController.getAllDoctors);
router.put('/doctors/:id', doctorController.updateDoctor);
router.put('/patients/:id/changePassword', doctorController.changePassword);
router.post('/doctors/:id/observations', doctorController.addObservation);

module.exports = router;
