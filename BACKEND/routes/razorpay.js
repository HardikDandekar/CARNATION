const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();
const Booking = require("../models/Booking");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: Math.round(amount), // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create order" });
  }
});

router.post("/save-booking", async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json({ success: true, booking: newBooking });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
