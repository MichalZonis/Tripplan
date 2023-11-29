var mongoose = require('mongoose');
const TripPlan = mongoose.model('tripPlan');

module.exports.createTripPlan = function (req, res) {
  console.log(req.body)
  var newTrip = new TripPlan();
  newTrip.title = req.body.newTrip.title;
  newTrip.dates.endDate = new Date(req.body.newTrip.dates.endDate);
  newTrip.dates.startDate = new Date(req.body.newTrip.dates.startDate);
  newTrip.save().then((savedTrip) => {
      console.log('Trip saved:', savedTrip);
      res.status(200).json(savedTrip)
    })
    .catch((error) => {
      console.error('Error saving trip:', error.message);
    })
};

module.exports.getAllTripsOfUser = function (req, res) {
  TripPlan.find({}) // TODO: when users are added to the schema, this should be by user as collaborator
    .then(trips => res.send(trips))
    .catch((error) => res.send(error))
}

module.exports.deleteTrip = function (req, res) {
  const tripToDelete = req.body.tripToDelete;
  console.log(tripToDelete)
  TripPlan.deleteOne({
      _id: tripToDelete._id
    }).then(trip => {
      console.log("deleted " + tripToDelete._id)
      res.status(200).json(trip)
    })
    .catch((error) => {
      console.error('Error deleting trip:', error.message);
    })
}