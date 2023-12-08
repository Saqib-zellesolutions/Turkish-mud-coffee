const express = require("express");
const AddSlider = require("../controller/SliderController/AddSlider");
const GetAllSlider = require("../controller/SliderController/GetSlider");
const GetSingleSlider = require("../controller/SliderController/SingleSlider");
const UpdateSlider = require("../controller/SliderController/UpdateSlider");
const DeleteSlider = require("../controller/SliderController/DeleteSlider");
const router = express.Router();

// Add Slider
router.post("/Add-Slider/:branch", AddSlider);

// Get All Slider
router.get("/Get-Slider/:branch", GetAllSlider);

// Get Single Slider
router.get("/Get-Single-Slider/:id/:branch", GetSingleSlider);

// Update Slider
router.put("/Update-Slider/:id/:branch", UpdateSlider);

// Delete Slider
router.delete("/Delete-Slider/:id/:branch", DeleteSlider);

module.exports = router;
