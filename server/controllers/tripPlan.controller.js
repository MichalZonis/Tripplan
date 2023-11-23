var mongoose = require('mongoose');
const TripPlan = mongoose.model('tripPlan');

module.exports.createTripPlan = function (req, res) {

    var newTrip = new TripPlan()
    newTrip = req.body.newTrip;
    console.log("fff")
    console.log(req.body.newTrip);
    res.status(200);
    // newTrip.save(function (err) {
    //     res.status(200);
    //     res.json(newTrip);
    // })
};