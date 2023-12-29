const express = require("express");
const GetFilterProductByCategory = require("../controller/FilterProductByCategory");
const router = express.Router();

// Get All FilterProductByCategory
// router.get("/Get-FilterProductByCategory/:branch", GetFilterProductByCategory);
router.get("/Get-FilterProductByCategory/:name/:branch", GetFilterProductByCategory);

module.exports = router;
