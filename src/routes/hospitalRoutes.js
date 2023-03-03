

const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', hospitalController.getAllHospitals);

router.get('/:hospitalId', hospitalController.getHospitalById);

router.post('/:patientId/observations', authMiddleware, hospitalController.createObservation);

router.get('/:patientId/observations', authMiddleware, hospitalController.getObservationsForPatient);

module.exports = router;
