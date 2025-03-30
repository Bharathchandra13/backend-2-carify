const mongoose = require('mongoose');

const CarpoolSchema = new mongoose.Schema({
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    selectedDate: { type: Date, required: true },
    numberOfTravelers: { type: Number, required: true }
});

module.exports = mongoose.model('Carpool', CarpoolSchema);
