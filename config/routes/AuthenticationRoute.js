const express = require("express");
const Signup = require("../controller/AuthenticationController/Singup");
const Login = require("../controller/AuthenticationController/Login");
const SignOut = require("../controller/AuthenticationController/SignOut");
const GetAllUsers = require("../controller/AuthenticationController/GetUser");
const UpdateUser = require("../controller/AuthenticationController/UpdateUser");
const DeleteUser = require("../controller/AuthenticationController/DeleteUser");
const router = express.Router();

// Signup
router.post("/Signup", Signup);

// Get Login
router.post("/Login", Login);

// Get SignOut
router.post("/SignOut", SignOut);

// Get USer
router.get("/Get-User/:branch", GetAllUsers);

//Update User
router.put("/Update-User/:id/:branch", UpdateUser);
// Delete User
router.delete("/Delete-User/:id/:branch", DeleteUser);

module.exports = router;
