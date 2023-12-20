const express = require("express");
const AddVariableProduct = require("../controller/VariableProductController/AddProduct");
const GetAllVariableProduct = require("../controller/VariableProductController/GetProduct");
const GetSingleVariableProduct = require("../controller/VariableProductController/SingleProduct");
const UpdateVariableProduct = require("../controller/VariableProductController/UpdateProduct");
const DeleteVariableProduct = require("../controller/VariableProductController/DeleteProduct");
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
const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images" },
]);
// Add Variable Product
router.post(
  "/Add-VariableProduct/:parent_id/:branch",
  uploadFields,
  AddVariableProduct
);

// Get All Variable Product
router.get("/Get-VariableProduct/:branch", GetAllVariableProduct);

// Get Single VariableProduct
router.get("/Get-Single-VariableProduct/:id/:branch", GetSingleVariableProduct);

// Update VariableProduct
router.put(
  "/Update-VariableProduct/:id/:branch",
  uploadFields,
  UpdateVariableProduct
);

// Delete VariableProduct
router.delete("/Delete-VariableProduct/:id/:branch", DeleteVariableProduct);

module.exports = router;
