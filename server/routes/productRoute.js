const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productCrtl");

router.post("/create", createProduct);

router.get("/getAll", getAllProducts);

router.get("/get/:id", getProductById);

router.put("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

module.exports = router;