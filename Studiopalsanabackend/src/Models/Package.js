const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Package",
  new mongoose.Schema({
    title: String,
    price: String,
    features: [String],
  })
);
