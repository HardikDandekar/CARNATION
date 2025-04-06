const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/booking");
const carRoutes = require("./routes/carRoutes");
const razorpayRoutes = require("./routes/razorpay");


app.use("/api/razorpay", razorpayRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/cars", carRoutes);

app.use("/api/bookings", bookingRoutes);





app.get("/", (req, res) => res.send("API is running..."));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
