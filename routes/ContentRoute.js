const express = require("express");
const AddContent = require("../controller/ContentController/AddContent");
const GetAllContent = require("../controller/ContentController/GetContent");
const GetSingleContent = require("../controller/ContentController/SingleContent");
const UpdateContent = require("../controller/ContentController/UpdateContent");
const DeleteContent = require("../controller/ContentController/DeleteContent");
const router = express.Router();

// Add Content
router.post("/Add-Content/:branch", AddContent);

// Get All Content
router.get("/Get-Content/:branch", GetAllContent);

// Get Single Content
router.get("/Get-Single-Content/:id/:branch", GetSingleContent);

// Update Content
router.put("/Update-Content/:id/:branch", UpdateContent);

// Delete Content
router.delete("/Delete-Content/:id/:branch", DeleteContent);

module.exports = router;
