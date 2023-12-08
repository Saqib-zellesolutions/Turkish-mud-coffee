const express = require("express");
const AddOrder = require("../controller/OrderController/AddOrder");
const GetAllOrder = require("../controller/OrderController/GetOrder");
const GetSingleOrder = require("../controller/OrderController/SingleOrder");
const UpdateOrder = require("../controller/OrderController/UpdateOrder");
const DeleteOrder = require("../controller/OrderController/DeleteOrder");
const router = express.Router();

// Add Order
router.post("/Add-Order/:branch", AddOrder);

// Get All Order
router.get("/Get-Order/:branch", GetAllOrder);

// Get Single Order
router.get("/Get-Single-Order/:id/:branch", GetSingleOrder);

// Update Order
router.put("/Update-Order/:id/:branch", UpdateOrder);

// Delete Order
router.delete("/Delete-Order/:id/:branch", DeleteOrder);

module.exports = router;
