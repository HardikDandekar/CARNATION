const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

router.put("/:id/payment-status", async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );
    res.status(200).json(updatedBooking);
  } catch (err) {
    res.status(500).json({ message: "Failed to update payment status" });
  }
});


router.post("/", async (req, res) => {
  try {
    console.log("📦 New Booking Request:", req.body); // Debug log

    const newBooking = new Booking(req.body);
    await newBooking.save();

    res.status(201).json(newBooking);
  } catch (err) {
    console.error("❌ Error saving booking:", err);
    res.status(500).json({ message: "Failed to save booking" });
  }
});



router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to delete booking" });
  }
});

module.exports = router;
