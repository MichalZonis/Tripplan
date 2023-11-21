const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
    name: String,
    GeolocationCoordinates: {
        Lat: Number,
        Lng: Number
    },
    isOptional: {
        type: Boolean,
        default: false,
    },
    visitHours: { // TODO: this will probably need to be expanded to include dates since events can overflow to the next day.
        type: {
            startTime: {
                type: String,
                match: /^([01]\d|2[0-3]):([0-5]\d)$/
            } // Regular expression to validate HH:mm format
            ,
            endTime: {
                type: String,
                match: /^([01]\d|2[0-3]):([0-5]\d)$/ 
            }// Regular expression to validate HH:mm format
        },
        validate: {
            validator: function () {
                // Check if the optional property is required based on the value of isOptional
                return this.isOptional || (!this.isOptional && this.visitHours);
            },
            message: 'visit hours are required when the location is agreed upon',
        }
    },
    description: String,
    attractionPrice: Number,
    // addedBy: User,
    // attachments: [],
});

const location = mongoose.model("Attraction", attractionSchema);

module.exports = location;