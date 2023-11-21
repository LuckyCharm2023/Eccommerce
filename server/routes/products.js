const express = require("express");
const {
  createProduct,
  getProduct,
  getProductByID,
} = require("../controllers/products");
const router = express.Router();

router.post("/createProducts", createProduct);
router.get("/getProducts", getProduct);
router.get("/getProducts/:id", getProductByID);

module.exports = router;
