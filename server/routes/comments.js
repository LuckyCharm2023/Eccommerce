const express = require("express");
const {
  createComment,
  getComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");
const router = express.Router();

router.post("/createComment", createComment);
router.get("/getComments/:id", getComment);
router.get("/getComments", getAllComment);
router.put("/updateComment/:id", updateComment);
router.delete("/deleteComment/:id", deleteComment);

module.exports = router;
