const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    GeolocationCoordinates: {
        type: {
            Lat: Number,
            Lng: Number
        },
        required: true
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
            } // Regular expression to validate HH:mm format
        },
        validate: {
            validator: function () {
                // Check if the optional property is required based on the value of isOptional
                return this.isOptional || (!this.isOptional && this.visitHours);
            },
            message: 'visit hours are required when the location is agreed upon',
        }
    },
    visitDates: {
        startDate: Date,
        endDate: Date
    }, // TODO: there should be validation that end date is after start date
    description: String,
    attractionPrice: Number,
    // addedBy: User,
    // attachments: [],
});

const attraction = mongoose.model("Attraction", attractionSchema);

module.exports = attraction;