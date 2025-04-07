const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  name: String,
  car: String,
  pickup: String,
  dropoff: String,
  date: String, // Format: "YYYY-MM-DD"
  availableSeats: Number,
  image: String
});

module.exports = mongoose.model('Ride', rideSchema);
