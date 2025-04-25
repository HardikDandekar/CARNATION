const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Admin = require("../models/Admin");

const router = express.Router();

// ✅ Register (User only)
router.post("/register", async (req, res) => {
  const { name, mobile, email, password } = req.body;
  console.log(req.body)
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, mobile, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Registration successful!", role: "user" });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Admin Login
router.post("/login/admin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Hardcoded credentials for admin login
    if (email === "admin@carnation.com" && password === "admin@123") {
      return res.status(200).json({
        message: "Admin login successful",
        role: "admin",
        adminName: "Admin"
      });
    }

    return res.status(400).json({ message: "Invalid admin credentials" });

  } catch (err) {
    console.error("❌ Admin Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    return res.status(200).json({
      message: "User login successful",
      role: "user",
      userName: user.name
    });

  } catch (err) {
    console.error("❌ User Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
