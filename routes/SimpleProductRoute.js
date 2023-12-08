const express = require("express");
const AddSimpleProduct = require("../controller/SimpleProductController/AddProduct");
const getAllSimpleProduct = require("../controller/SimpleProductController/GetProduct");
const UpdateSimpleProduct = require("../controller/SimpleProductController/UpdateProduct");
const DeleteSimpleProduct = require("../controller/SimpleProductController/DeleteProduct");
const GetSingleSimpleProduct = require("../controller/SimpleProductController/SingleProduct");
const router = express.Router();

// Add Simple Product
router.post("/Add-SimpleProduct/:parent_id/:branch", AddSimpleProduct);

// Get All SimpleProduct
router.get("/Get-SimpleProduct/:branch", getAllSimpleProduct);

// Get Single SimpleProduct
router.get("/Get-Single-SimpleProduct/:id/:branch", GetSingleSimpleProduct);

// Update SimpleProduct
router.put("/Update-SimpleProduct/:id/:branch", UpdateSimpleProduct);

// Delete SimpleProduct
router.delete("/Delete-SimpleProduct/:id/:branch", DeleteSimpleProduct);

module.exports = router;
