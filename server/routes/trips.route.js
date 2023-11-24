const express = require('express');
const { GetAttractionsByTripID, AddAttraction } = require('../controllers/TripPlan.controller');
const router = express.Router();

// returns all attrations of a specific trip
router.get('/:id/attractions', GetAttractionsByTripID)
router.post('/:id/addAttraction', AddAttraction);

module.exports = router;