const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    contactInfo: { type: String, required: true },
    price: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);

