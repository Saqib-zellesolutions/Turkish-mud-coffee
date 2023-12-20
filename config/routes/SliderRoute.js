const express = require("express");
const AddSlider = require("../controller/SliderController/AddSlider");
const GetAllSlider = require("../controller/SliderController/GetSlider");
const GetSingleSlider = require("../controller/SliderController/SingleSlider");
const UpdateSlider = require("../controller/SliderController/UpdateSlider");
const DeleteSlider = require("../controller/SliderController/DeleteSlider");
const multer = require("multer");
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Define the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Define the filename for the uploaded files
  },
});

// Initialize Multer
const upload = multer({ storage: storage });

// Add Slider
router.post("/Add-Slider/:branch", upload.single("image"), AddSlider);

// Get All Slider
router.get("/Get-Slider/:branch", GetAllSlider);

// Get Single Slider
router.get("/Get-Single-Slider/:id/:branch", GetSingleSlider);

// Update Slider
router.put("/Update-Slider/:id/:branch", upload.single("image"), UpdateSlider);

// Delete Slider
router.delete("/Delete-Slider/:id/:branch", DeleteSlider);

module.exports = router;
