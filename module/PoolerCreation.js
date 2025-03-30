const mongoose = require("mongoose");

const PoolerCreationSchema = new mongoose.Schema({
    leavingFrom: { type: String, required: true },
    goingTo: { type: String, required: true },
    selectedSeats: { type: Number, required: true },
    selectedDate: { type: Date, required: true },
    rideCost: { type: Number, required: true },
    carName: { type: String, required: true },
    carModel: { type: String, required: true },
    time: { type: String, default: "12:00 PM" },
    contact: { type: String, default: "1234567890" }
}, { timestamps: true });

module.exports = mongoose.model("PoolerCreation", PoolerCreationSchema);
