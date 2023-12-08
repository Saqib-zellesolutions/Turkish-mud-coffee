const express = require("express");
const AddTax = require("../controller/TaxController/AddTax");
const GetAllTax = require("../controller/TaxController/GetTax");
const GetSingleTax = require("../controller/TaxController/SingleTax");
const UpdateTax = require("../controller/TaxController/UpdateTax");
const DeleteTax = require("../controller/TaxController/DeleteTax");
const router = express.Router();

// Add Tax
router.post("/Add-Tax/:branch", AddTax);

// Get All Tax
router.get("/Get-Tax/:branch", GetAllTax);

// Get Single Tax
router.get("/Get-Single-Tax/:id/:branch", GetSingleTax);

// Update Tax
router.put("/Update-Tax/:id/:branch", UpdateTax);

// Delete Tax
router.delete("/Delete-Tax/:id/:branch", DeleteTax);

module.exports = router;
