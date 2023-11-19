const express = require("express");
const {
  registerUser,
  loginUser,
  authentication,
  getAllUsers,
} = require("../controllers/auth");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/userData", authentication);
router.get("/getUsers", getAllUsers);

module.exports = router;
