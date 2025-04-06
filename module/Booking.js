const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    username: String,
    carModel: String,
    contactNumber: String,
    timeSlot: String,
    garageId: String,
    serviceType: String,
    location: String,
    status: {
        type: String,
        default: "Pending"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);
