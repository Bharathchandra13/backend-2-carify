const mongoose = require('mongoose');

const FullRideSchema = new mongoose.Schema({
    leavingFrom: { type: String, required: true },
    goingTo: { type: String, required: true },
    selectedDate: { type: Date, required: true },
    vehicleType: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('FullRide', FullRideSchema);
