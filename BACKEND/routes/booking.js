const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const User = require('../models/User');

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

    // 2. Update User's myBooking field
    if (req.body.userId) {
      await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { myBooking: newBooking._id } },   // Push new booking ID
        { new: true }
      );
    }
    
    res.status(201).json(newBooking);
  } catch (err) {
    console.error("❌ Error saving booking:", err);
    res.status(500).json({ message: "Failed to save booking" });
  }
});



router.get('/history/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const user = await User.findById(userId).populate('myBooking');

    console.log(user)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.myBooking) {
      return res.status(200).json([]);  // return empty array if no booking
    }

    // If myBooking is array
    if (Array.isArray(user.myBooking)) {
      return res.status(200).json(user.myBooking.filter(b => b !== null)); // remove nulls
    }

    // If myBooking is single booking
    return res.status(200).json([user.myBooking]);
    
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Something went wrong" });
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
