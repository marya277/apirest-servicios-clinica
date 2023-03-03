const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/patients', authMiddleware, patientController.getAllPatients);
router.get('/patients/:patientId', authMiddleware, patientController.getPatientById);
router.post('/patients/:patientId/observations', authMiddleware, patientController.createObservation);
router.get('/patients/:patientId/observations', authMiddleware, patientController.getObservationsForPatient);

module.exports = router;
