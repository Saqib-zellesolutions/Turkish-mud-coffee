const express = require("express");
const CategoryWithProduct = require("../controller/CategoryWIthProduct/Get");
const PaginationCategoryWthProduct = require("../controller/CategoryWIthProduct/Pagination");

const router = express.Router();

// Get All CategoryWIth PRoduct
router.get("/Get-CategoryWithProduct/:branch", CategoryWithProduct);

router.get("/Get-CategoryWithProduct-limit/:branch", PaginationCategoryWthProduct);
module.exports = router;
