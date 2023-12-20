const express = require("express");
const AddPayment = require("../controller/PaymentController/AddPayment");
const GetAllPayment = require("../controller/PaymentController/GetPayment");
const GetSinglePayment = require("../controller/PaymentController/SinglePayment");
const UpdatePayment = require("../controller/PaymentController/UpdatePayment");
const DeletePayment = require("../controller/PaymentController/DeletePayment");
const router = express.Router();

// Add Payment
router.post("/Add-Payment/:branch", AddPayment);

// Get All Payment
router.get("/Get-Payment/:branch", GetAllPayment);

// Get Single Payment
router.get("/Get-Single-Payment/:id/:branch", GetSinglePayment);

// Update Payment
router.put("/Update-Payment/:id/:branch", UpdatePayment);

// Delete Payment
router.delete("/Delete-Payment/:id/:branch", DeletePayment);

module.exports = router;
