const express = require("express");
const CategoryWithProduct = require("../controller/CategoryWIthProduct/Get");

const router = express.Router();

// Get All CategoryWIth PRoduct
router.get("/Get-CategoryWithProduct/:branch", CategoryWithProduct);

module.exports = router;
