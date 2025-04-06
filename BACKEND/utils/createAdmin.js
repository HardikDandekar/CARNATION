const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL).then(async () => {
  const adminExist = await Admin.findOne({ email: "admin@carnation.com" });
  if (adminExist) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = new Admin({
    email: "admin@carnation.com",
    password: hashedPassword
  });

  await admin.save();
  console.log("✅ Admin created");
  process.exit();
});
