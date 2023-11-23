var mongoose = require('mongoose');
const TripPlan = mongoose.model('tripPlan');

module.exports.createTripPlan = function (req, res) {

  var newTrip = new TripPlan();
  newTrip.title = req.body.newTrip.title;
  newTrip.dates.endDate = new Date(req.body.newTrip.dates.endDate);
  newTrip.dates.startDate = new Date(req.body.newTrip.dates.startDate);
  console.log(newTrip.dates.startDate <= newTrip.dates.endDate)
  console.log(newTrip.dates.endDate)
  newTrip.save().then((savedTrip) => {
      console.log('Trip saved:', savedTrip);
      res.status(200).json(savedTrip)
    })
    .catch((error) => {
      console.error('Error saving trip:', error.message);
    })
};