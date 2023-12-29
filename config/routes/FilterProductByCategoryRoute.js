const express = require("express");
const GetFilterProductByCategory = require("../controller/FilterProductByCategory");
const router = express.Router();

// Get All FilterProductByCategory
router.get("/Get-FilterProductByCategory/:category/:branch", GetFilterProductByCategory);

module.exports = router;
