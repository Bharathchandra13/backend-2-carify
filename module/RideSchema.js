const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
    driverName: { type: String, required: true },
    carModel: { type: String, required: true },
    price: { type: String, required: true },
    time: { type: String, required: true },
    rating: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    selectedDate: { type: String, required: true },
    availableSeats: { type: Number, required: true }
});

module.exports = mongoose.model('Ride', RideSchema);
