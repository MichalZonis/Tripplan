const TripPlan = require('../models/TripPlan');

module.exports.GetAttractionsByTripID = async function(req, res, next) {
    const id = req.params['id']
    TripPlan.findById(id).then((trip) => {
        res.status(200).json({message: "Found trip attractions", attractions: trip.attractions})
    }).catch(error => {
        res.status(500).json({message: "error while searching for trip: " + id, error: error})
    })
}