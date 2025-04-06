// routes/car.js
const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");

// ✅ Add a new car
router.post("/create", async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const car = new Car({ name, price, image });
    await car.save();
    res.status(201).json({ message: "Car added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding car" });
  }
});

// ✅ Get all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cars" });
  }
});

// ✅ Update car by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating car" });
  }
});

// ✅ Delete car by ID
router.delete("/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting car" });
  }
});

module.exports = router;
