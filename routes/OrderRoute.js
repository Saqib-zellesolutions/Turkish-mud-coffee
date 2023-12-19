const express = require("express");
const AddOrder = require("../controller/OrderController/AddOrder");
const GetAllOrder = require("../controller/OrderController/GetOrder");
const GetSingleOrder = require("../controller/OrderController/SingleOrder");
const UpdateOrder = require("../controller/OrderController/UpdateOrder");
const DeleteOrder = require("../controller/OrderController/DeleteOrder");
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

// Initialize multer
const upload = multer({ storage: storage });

// Add Order with multer middleware
router.post("/Add-Order/:branch", upload.array("images"), AddOrder);

// Get All Order
router.get("/Get-Order/:branch", GetAllOrder);

// Get Single Order
router.get("/Get-Single-Order/:id/:branch", GetSingleOrder);

// Update Order
router.put("/Update-Order/:id/:branch", UpdateOrder);

// Delete Order
router.delete("/Delete-Order/:id/:branch", DeleteOrder);

module.exports = router;
