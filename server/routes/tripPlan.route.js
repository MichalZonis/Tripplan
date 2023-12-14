const express = require('express');
const TripPlanRouter = express.Router();
const TripPlan = require('../models/TripPlan'); // even if not used, it needs to be called before the controller
var ctrlTripPlan = require('../controllers/tripPlan.controller');

TripPlanRouter.post('/create', ctrlTripPlan.createTripPlan);
TripPlanRouter.get('/all', ctrlTripPlan.getAllTripsOfUser);
TripPlanRouter.post('/delete', ctrlTripPlan.deleteTrip);
TripPlanRouter.post('/edit', ctrlTripPlan.EditTrip);

// GameRouter.get('/check', function (req, res) {
//     res.send('games works!');
// });

// GameRouter.get('/user/:userID', ctrlGame.getPuzzlesByUser);

// GameRouter.get('/:Width/:Height', ctrlGame.getPuzzleBySize, ctrlGame.calculateHints);

module.exports = TripPlanRouter;