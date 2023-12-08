const express = require("express");
const AddBeverages = require("../controller/BeveragesController/AddBeverages");
const getAllBeverages = require("../controller/BeveragesController/GetBeverages");
const GetSingleBeverages = require("../controller/BeveragesController/SingleBeveraages");
const UpdateBeverages = require("../controller/BeveragesController/UpdateBeverages");
const DeleteBeverages = require("../controller/BeveragesController/DeleteBeverages");
const router = express.Router();

// Add Beverages
router.post("/Add-Beverages/:parent_id/:branch", AddBeverages);

// Get All Beverages
router.get("/Get-Beverages/:branch", getAllBeverages);

// Get Single Beverages
router.get("/Get-Single-Beverages/:id/:branch", GetSingleBeverages);

// Update Beverages
router.put("/Update-Beverages/:id/:branch", UpdateBeverages);

// Delete Beverages
router.delete("/Delete-Beverages/:id/:branch", DeleteBeverages);

module.exports = router;
