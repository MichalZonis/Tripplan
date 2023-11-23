const mongoose = require('mongoose');
//const attraction = require('./Attraction');

const tripPlanSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    //collaborators: [],
    dates: {
        startDate: {
            type: Date,
            required: true,
            validate: {
                validator: function (value) {
                    // 'this' refers to the document being validated
                    return value <= this.endDate; // Ensure startDate is before or equal to endDate
                },
                message: 'Start date must be before or equal to end date',
            },
        },
        endDate: {
            type: Date,
            required: true,
        }
    },
    thumbnail: {
        data: Buffer,
        contentType: String,
    },
    //attractions: [attraction] // these are embedded subdocuments
});

const tripPlan = mongoose.model("tripPlan", tripPlanSchema);

module.exports = tripPlan;

// Example usage: how to save a photo for the thumbnail
// const newPhoto = new Photo();
// newPhoto.data = Buffer.from('your_binary_data', 'base64'); // replace 'your_binary_data' with the actual base64-encoded image data
// newPhoto.contentType = 'image/jpeg'; // set the content type based on the image type

// newPhoto.save((err, savedPhoto) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Photo saved successfully:', savedPhoto);
//   }
// });