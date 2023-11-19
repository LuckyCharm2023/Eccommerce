const express = require("express");
const {
  createProduct,
  getProduct,
  getProductByID,
} = require("../controllers/products");
const router = express.Router();

router.post("/createProducts", createProduct);
router.post("/getProducts", getProduct);
router.post("/getProducts/:id", getProductByID);

module.exports = router;
