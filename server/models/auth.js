const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    userType: { type: String, required: true },
    uname: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    image: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
);
const LCAuth = mongoose.model("LCAuth", AuthSchema);
exports.LCAuth = LCAuth;
