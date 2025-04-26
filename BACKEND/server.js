const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));




// MongoDB Connect
mongoose.connect(process.env.MONGO_URL, {
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/auth");
const carRoutes = require("./routes/car");
const razorpayRoutes = require("./routes/razorpay"); 
const bookingRoutes = require("./routes/booking"); 

app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/razorpay", razorpayRoutes);

app.get("/", (req, res) => res.send("API is running..."));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
