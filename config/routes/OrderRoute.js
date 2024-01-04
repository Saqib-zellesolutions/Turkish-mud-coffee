const express = require("express");
const AddOrder = require("../controller/OrderController/AddOrder");
const GetAllOrder = require("../controller/OrderController/GetOrder");
const GetSingleOrder = require("../controller/OrderController/SingleOrder");
const UpdateOrder = require("../controller/OrderController/UpdateOrder");
const DeleteOrder = require("../controller/OrderController/DeleteOrder");
const router = express.Router();

// Add Order with multer middleware
// router.post("/Add-Order/:branch", AddOrder);
router.post("/Add-Order/:branch", (req, res) => {
  // Access the io instance from the request object
  const io = req.io;

  AddOrder(req, res, io); // Pass the io instance to the AddOrder controller
});
// Get All Order
router.get("/Get-Order/:branch", GetAllOrder);

// Get Single Order
router.get("/Get-Single-Order/:id/:branch", GetSingleOrder);

// Update Order
router.put("/Update-Order/:id/:branch", UpdateOrder);

// Delete Order
router.delete("/Delete-Order/:id/:branch", DeleteOrder);

module.exports = router;
