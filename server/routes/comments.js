const express = require("express");
const { createComment, getComment } = require("../controllers/comments");
const router = express.Router();

router.post("/createComment", createComment);
router.get("/getComments/:id", getComment);

module.exports = router;
