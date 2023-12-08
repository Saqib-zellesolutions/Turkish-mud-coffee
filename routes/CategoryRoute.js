const express = require("express");
const AddCategory = require("../controller/CategoryController/AddCategory");
const GetAllCategory = require("../controller/CategoryController/GetCategory");
const GetSingleCategory = require("../controller/CategoryController/SingleCategory");
const UpdateCategory = require("../controller/CategoryController/UpdateCategory");
const DeleteCategory = require("../controller/CategoryController/DeleteCategory");
const router = express.Router();

// Add Category
router.post("/Add-Category/:branch", AddCategory);

// Get All Category
router.get("/Get-Category/:branch", GetAllCategory);

// Get Single Category
router.get("/Get-Single-Category/:id/:branch", GetSingleCategory);

// Update Category
router.put("/Update-Category/:id/:branch", UpdateCategory);

// Delete Category
router.delete("/Delete-Category/:id/:branch", DeleteCategory);

module.exports = router;
