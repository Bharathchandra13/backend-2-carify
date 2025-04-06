const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  garageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  serviceType: String,
  userCar: String,
  date: Date,
  location: String,
  contactNumber: String,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  notes: String
});

module.exports = mongoose.model('Appointment', appointmentSchema);
