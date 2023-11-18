const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: String, required: true },
});
const Comment = mongoose.model("Comment", commentSchema);
exports.Comment = Comment;
