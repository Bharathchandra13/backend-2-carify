const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    username: { type: String, required: true },
    carModel: { type: String, required: true },
    contactNumber: { type: String, required: true },
    timeSlot: { type: String, required: true },
    garageId: { type: mongoose.Schema.Types.ObjectId, ref: "Garage", required: true },
    status: { type: String, default: "Pending" }
});

// Prevent model overwrite error
const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

module.exports = Booking;
