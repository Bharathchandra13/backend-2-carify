const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    selectedDate: { type: Date, required: true },
    availableSeats: { type: Number, required: true }, // Renamed from numberOfTravelers
    driverName: { type: String, required: true },
    carModel: { type: String, required: true },
    price: { type: Number, required: true },
    time: { type: String, required: true },
    rating: { type: Number, required: true },
    imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Ride', RideSchema); // Renamed to match API

