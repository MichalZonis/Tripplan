const mongoose = require('mongoose');

const tripPlanSchema = new mongoose.Schema({
    title: String,
    //collaborators: [],
    dates: {
        startDate: Date,
        endDate: Date
    }, // TODO: there should be validation that end date is after start date
    thumbnail: {
        data: Buffer,
        contentType: String,
    },
    //locations: []
});

const tripPlan = mongoose.model("TripPlan", tripPlanSchema);

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