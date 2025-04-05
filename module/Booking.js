const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  garageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  serviceType: String, // e.g., "Car Wash"
  date: Date,
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
