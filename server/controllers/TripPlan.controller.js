const TripPlan = require('../models/TripPlan');
const Attraction = require('../models/Attraction');

module.exports.GetAttractionsByTripID = async function(req, res) {
    const id = req.params['id']
    TripPlan.findById(id).then(async (trip) => {
        const attractions = await Attraction.find({ '_id': { $in: trip.attractions } });
        res.status(200).json({attractions: attractions})
    }).catch(error => {
        res.status(500).json({message: "error while searching for trip: " + id, error: error})
    })
}

module.exports.AddAttraction = async function(req, res) {
    const attraction = req.body.attraction;
    const tripID = req.params.id;
    const trip = await TripPlan.findById(tripID);

    if(!trip) {
        return res.status(404).json({message: "no trip found with id " + tripID})
    }

    if(!attraction) {
        return res.status(500).json({message: "Missing attraction to add"})
    }

    const attractionToAdd = {
        name: attraction.name,
        GeolocationCoordinates: attraction.GeolocationCoordinates,
        isOptional: attraction.isOptional,
        visitHours: attraction.visitHours,
        visitDates: {startDate: new Date(attraction.visitDates.startDate), endDate: new Date(attraction.visitDates.endDate)},
        description: attraction.description,
        attractionPrice: attraction.attractionPrice
    }

    try {
        // create the attraction
        const newAttraction = await Attraction.create(attractionToAdd);
        
        // link the attraction to the gien trip ID
        const trip = await TripPlan.findById(tripID);
        trip.attractions.push(newAttraction._id);
        await trip.save();
        res.status(200).json({message: "created attraction"})
    } catch (err) {
        return res.status(500).json({error: err})
    }
}