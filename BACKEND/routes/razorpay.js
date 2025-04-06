const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();
const Booking = require("../models/Booking");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

// Create Razorpay Order
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ success: false, error: "Invalid amount" });
    }

    const options = {
      amount: Math.round(amount), // already in paise from frontend
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
      payment_capture: 1 // auto capture after success
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("❌ Razorpay order error:", error);
    res.status(500).json({ success: false, error: "Failed to create order" });
  }
});

// Save booking after payment
router.post("/save-booking", async (req, res) => {
  try {
    console.log("📥 Booking request received:", req.body);
    const newBooking = await Booking.create(req.body);
    console.log("✅ Booking saved:", newBooking);
    res.status(201).json({ success: true, booking: newBooking });
  } catch (err) {
    console.error("❌ Booking save error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
