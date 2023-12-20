const express = require("express");
const AddShipping = require("../controller/ShippingController/AddShipping");
const GetAllShipping = require("../controller/ShippingController/GetShipping");
const GetSingleShipping = require("../controller/ShippingController/SingleShipping");
const UpdateShipping = require("../controller/ShippingController/UpdateShipping");
const DeleteShipping = require("../controller/ShippingController/DeleteShipping");
const router = express.Router();

// Add Shipping
router.post("/Add-Shipping/:branch", AddShipping);

// Get All Shipping
router.get("/Get-Shipping/:branch", GetAllShipping);

// Get Single Shipping
router.get("/Get-Single-Shipping/:id/:branch", GetSingleShipping);

// Update Shipping
router.put("/Update-Shipping/:id/:branch", UpdateShipping);

// Delete Shipping
router.delete("/Delete-Shipping/:id/:branch", DeleteShipping);

module.exports = router;
