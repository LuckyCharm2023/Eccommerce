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
