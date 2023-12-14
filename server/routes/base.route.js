const express = require('express');
const router = express.Router();
const TripPlanRouter = require('./tripPlan.route')
const AuthRouter = require('./auth.route')

router.get('/', function (req, res) {
    console.log(req)
    res.send('API works!!!');
});

router.use('/auth', AuthRouter);
router.use('/tripplan', TripPlanRouter);

module.exports = router;