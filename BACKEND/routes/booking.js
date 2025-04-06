const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// ✅ Create a new booking
router.post("/", async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    console.log("📥 Booking saved:", newBooking);
    res.status(201).json({ success: true, booking: newBooking });
  } catch (err) {
    console.error("❌ Booking save error:", err.message);
    res.status(500).json({ success: false, error: "Failed to save booking" });
  }
});

// ✅ Get all bookings (for admin)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    console.error("❌ Fetch error:", err.message);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// ✅ Delete booking by ID
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Booking deleted" });
  } catch (err) {
    console.error("❌ Delete error:", err.message);
    res.status(500).json({ success: false, error: "Failed to delete booking" });
  }
});

module.exports = router;
