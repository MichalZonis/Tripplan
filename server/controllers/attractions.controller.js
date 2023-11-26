const Attraction = require('../models/Attraction');

module.exports.UpdateAttraction = async function (req, res) {
    const attractionID = req.body.attraction.id;
    const {id:_, ...attraction} = req.body.attraction;

    if(!attraction) {
        return res.status(404).json({error: "no attraction sent"})
    }

    Attraction.findByIdAndUpdate(attractionID, attraction)
    .then((document) => {
        if(!document) {
            return res.status(404).json({error: "no attraction found with given id"})
        }
        return res.status(200).json({message: "updated successfully"})
    }) 
    .catch(error => {
        return res.status(500).json({error: error})
    })
}