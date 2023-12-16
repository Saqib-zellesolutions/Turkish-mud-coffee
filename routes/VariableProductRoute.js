const express = require("express");
const AddVariableProduct = require("../controller/VariableProductController/AddProduct");
const GetAllVariableProduct = require("../controller/VariableProductController/GetProduct");
const GetSingleVariableProduct = require("../controller/VariableProductController/SingleProduct");
const UpdateVariableProduct = require("../controller/VariableProductController/UpdateProduct");
const DeleteVariableProduct = require("../controller/VariableProductController/DeleteProduct");
const router = express.Router();

// Add Variable Product
router.post("/Add-VariableProduct/:parent_id/:branch", AddVariableProduct);

// Get All Variable Product
router.get("/Get-VariableProduct/:branch", GetAllVariableProduct);

// Get Single VariableProduct
router.get("/Get-Single-VariableProduct/:id/:branch", GetSingleVariableProduct);

// Update VariableProduct
router.put("/Update-VariableProduct/:id/:branch", UpdateVariableProduct);

// Delete VariableProduct
router.delete("/Delete-VariableProduct/:id/:branch", DeleteVariableProduct);

module.exports = router;
