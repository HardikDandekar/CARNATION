const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String
});

module.exports = mongoose.model('Car', CarSchema);
