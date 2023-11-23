const express = require('express');
const TripPlanRouter = express.Router();
const TripPlan = require('../models/TripPlan'); 
var ctrlTripPlan = require('../controllers/tripPlan.controller');

// TODO: this is a template for a controller. create new ones beased on this one and rename or delete this on as needed

TripPlanRouter.get('/test', function (req, res) {
    res.send("lalalala")
})
TripPlanRouter.post('/create', ctrlTripPlan.createTripPlan);

// GameRouter.get('/check', function (req, res) {
//     res.send('games works!');
// });

// GameRouter.get('/user/:userID', ctrlGame.getPuzzlesByUser);

// GameRouter.get('/:Width/:Height', ctrlGame.getPuzzleBySize, ctrlGame.calculateHints);

module.exports = TripPlanRouter;