const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  garageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  username: String,
  email: String,
  serviceType: String,
  userCar: String,
  date: Date,
  location: String,
  contactNumber: String,
  notes: String,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
