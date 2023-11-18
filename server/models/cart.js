const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Cart = mongoose.model("Cart", cartSchema);
exports.Cart = Cart;
