
const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  serviceType: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, required: true },
  scheduledAt: { type: Date, required: true }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
