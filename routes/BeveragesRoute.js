const express = require("express");
const AddBeverages = require("../controller/BeveragesController/AddBeverages");
const getAllBeverages = require("../controller/BeveragesController/GetBeverages");
const GetSingleBeverages = require("../controller/BeveragesController/SingleBeveraages");
const UpdateBeverages = require("../controller/BeveragesController/UpdateBeverages");
const DeleteBeverages = require("../controller/BeveragesController/DeleteBeverages");
const multer = require("multer");
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Define the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname); // Define the filename for the uploaded files
  },
});

// Initialize Multer
const upload = multer({ storage: storage });
// Add Beverages
router.post(
  "/Add-Beverages/:parent_id/:branch",
  upload.array("images"),
  AddBeverages
);

// Get All Beverages
router.get("/Get-Beverages/:branch", getAllBeverages);

// Get Single Beverages
router.get("/Get-Single-Beverages/:id/:branch", GetSingleBeverages);

// Update Beverages
router.put(
  "/Update-Beverages/:id/:branch",
  upload.array("images"),
  UpdateBeverages
);

// Delete Beverages
router.delete("/Delete-Beverages/:id/:branch", DeleteBeverages);

module.exports = router;
