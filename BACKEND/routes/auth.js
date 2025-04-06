const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const User = require("../models/User");

const router = express.Router();

// ✅ REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  console.log("📩 Incoming registration:", req.body);

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email is already registered. Please log in.",
        redirectToLogin: true
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "Registration successful! Please log in.",
      switchToLogin: true,
      role: "user"
    });

  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("📩 Incoming login:", req.body);

  try {
    const admin = await Admin.findOne({ email });
    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      return res.status(200).json({
        message: "Login successful",
        role: "admin",
        adminName: admin.name,
        email: admin.email
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      message: "Login successful",
      role: "user",
      userName: user.name,
      email: user.email
    });

  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
