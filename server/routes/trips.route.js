const express = require('express');
const { GetAttractionsByTripID, 
        AddAttraction, 
        UpdateAttraction } = require('../controllers/TripPlan.controller');
const router = express.Router();

// returns all attrations of a specific trip
router.get('/:id/attractions', GetAttractionsByTripID);
router.post('/:id/addAttraction', AddAttraction);
router.post('/:id/updateAttraction', UpdateAttraction);

module.exports = router;