const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Object },
    spec: { type: Object, required: true },
    rating: { type: String },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
exports.Product = Product;
