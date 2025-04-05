// module/ServiceUser.js

const mongoose = require('mongoose');

const serviceUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  role: {
    type: String,
    enum: ['user', 'garage'],
    default: 'user',
  }
});

module.exports = mongoose.model('ServiceUser', serviceUserSchema);
