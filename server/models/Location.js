const mongoose = require('mongoose');

// TODO: this is a template for an object model. create others as needed and rename or delete this one.

const locationSchema = new mongoose.Schema({
    name: String,
    GeolocationCoordinates: {
        Lat: Number,
        Lng: Number
    },
    isOptional: {
        type: Boolean,
        default: false,
      },
    visitHours: {
        type: {startTime: Date, endTime: Date},
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

const location = mongoose.model("Location", locationSchema);

module.exports = location;