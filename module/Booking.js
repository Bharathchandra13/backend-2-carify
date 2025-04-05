const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  username: { type: String, required: true },
  carModel: { type: String, required: true },
  contactNumber: { type: String, required: true },
  timeSlot: { type: String, required: true },
  garageId: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
