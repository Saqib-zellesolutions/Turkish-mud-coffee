const express = require("express");
const AddSimpleProduct = require("../controller/SimpleProductController/AddProduct");
const getAllSimpleProduct = require("../controller/SimpleProductController/GetProduct");
const UpdateSimpleProduct = require("../controller/SimpleProductController/UpdateProduct");
const DeleteSimpleProduct = require("../controller/SimpleProductController/DeleteProduct");
const GetSingleSimpleProduct = require("../controller/SimpleProductController/SingleProduct");
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

// Add Simple Product
router.post(
  "/Add-SimpleProduct/:parent_id/:branch",
  upload.array("images"),
  AddSimpleProduct
);

// Get All SimpleProduct
router.get("/Get-SimpleProduct/:branch", getAllSimpleProduct);

// Get Single SimpleProduct
router.get("/Get-Single-SimpleProduct/:id/:branch", GetSingleSimpleProduct);

// Update SimpleProduct
router.put(
  "/Update-SimpleProduct/:id/:branch",
  upload.array("images"),
  UpdateSimpleProduct
);

// Delete SimpleProduct
router.delete("/Delete-SimpleProduct/:id/:branch", DeleteSimpleProduct);

module.exports = router;
