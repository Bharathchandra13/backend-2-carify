const mongoose = require('mongoose');

const fullRideSchema = new mongoose.Schema({
    leavingFrom: String,
    goingTo: String,
    selectedDate: Date,
    vehicleType: String,
    pooler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('FullRide', fullRideSchema);
