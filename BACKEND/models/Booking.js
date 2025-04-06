const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  carName: String,
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
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
