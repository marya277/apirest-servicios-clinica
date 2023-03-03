const express = require('express');
const router = express.Router();

const observationController = require('../controllers/observationsController');

router.post('/', observationController.createObservation);

module.exports = router;
