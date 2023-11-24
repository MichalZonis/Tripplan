const express = require('express');
const { GetAttractionsByTripID } = require('../controllers/TripPlan.controller');
const router = express.Router();

// returns all attrations of a specific trip
router.get('/:id/attractions', GetAttractionsByTripID)

module.exports = router;