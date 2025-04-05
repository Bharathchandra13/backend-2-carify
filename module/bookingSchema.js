const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    serviceType: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: Date, required: true }
});

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
