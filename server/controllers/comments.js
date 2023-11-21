const { Comment } = require("../models/comments");

exports.createComment = async (req, res, next) => {
  const { userId, productId, comment, rating } = req.body;
  try {
    if (userId !== "" && productId !== "" && comment !== "" && rating !== "") {
      const response = await Comment.create({
        userId,
        productId,
        comment,
        rating,
      });
      res.status(200).json({ status: "ok", data: response });
    }
  } catch (error) {
    next(error);
  }
};
exports.getComment = async (req, res, next) => {
  try {
    const Comments = await Comment.find({});
    const particularComment = Comments.filter(
      (item) => item.productId === req.params.id
    );
    res.status(200).json({ status: "ok", data: particularComment });
  } catch (error) {
    next(error);
  }
};
exports.updateComment = async (req, res, next) => {
  try {
    await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ status: "ok" });
  } catch (error) {
    next(error);
  }
};
exports.deleteComment = async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "ok" });
  } catch (error) {
    next(error);
  }
};
