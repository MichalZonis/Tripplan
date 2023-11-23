const express = require('express');
const router = express.Router();
const TripPlanRouter = require('./tripPlan.route')

router.get('/', function (req, res) {
    res.send('API works!!!');
});

// router.get('/tripplan', function (req, res) {
//     res.send('tripplan!!!');
// });


router.use('/tripplan', TripPlanRouter);


module.exports = router;