const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String
});

module.exports = mongoose.model("Cart", cartSchema);