const express = require("express");
const multer = require("multer");
const AddCategory = require("../controller/CategoryController/AddCategory");
const GetAllCategory = require("../controller/CategoryController/GetCategory");
const GetSingleCategory = require("../controller/CategoryController/SingleCategory");
const UpdateCategory = require("../controller/CategoryController/UpdateCategory");
const DeleteCategory = require("../controller/CategoryController/DeleteCategory");

const router = express.Router();

// Set up Multer storage
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

// Add Category with Multer middleware
router.post(
  "/Add-Category/:branch",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "banner_image", maxCount: 1 },
  ]),
  AddCategory
);

// Get All Category
router.get("/Get-Category/:branch", GetAllCategory);

// Get Single Category
router.get("/Get-Single-Category/:id/:branch", GetSingleCategory);

// Update Category
router.put(
  "/Update-Category/:id/:branch",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "banner_image", maxCount: 1 },
  ]),
  UpdateCategory
);

// Delete Category
router.delete("/Delete-Category/:id/:branch", DeleteCategory);

module.exports = router;
