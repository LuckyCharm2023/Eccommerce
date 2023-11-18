const express = require("express");
const { createProduct, getProduct } = require("../controllers/products");
const router = express.Router();

router.post("/createProducts", createProduct);
router.post("/getProducts", getProduct);

module.exports = router;
