const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productCode: { type: String, required: true },
  description: { type: String, required: true },
  oum: { type: String, required: true },
  brand: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
