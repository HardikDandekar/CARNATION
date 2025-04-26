const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,                // user's name
  email: String,
  mobile: String,              // ✅ NEW
  carName: String,
  pickupLocation: String,      // ✅ NEW
  dropLocation: String,        // ✅ NEW
  pickupDate: String,          // ✅ NEW
  pickupTime: String,          // ✅ NEW
  pickup: {
    lat: Number,
    lng: Number
  },
  drop: {
    lat: Number,
    lng: Number
  },
  distance: Number,
  mapPrice: Number,
  carPrice: Number,
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  paymentStatus: {
    type: Boolean,
    default: false, // false = Pending, true = Paid
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
