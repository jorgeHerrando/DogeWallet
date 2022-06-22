// ************ Require's ************
const express = require("express");
const router = express.Router();
// const authToken = require("../middlewares/authToken");

// ************ Validations/Middlewares ************
const loginFormValidation = require("../middlewares/loginFormValidation");

// ************ Controller Require ************
const usersController = require("../controllers/usersController");

// Login
router.post("/login", loginFormValidation, usersController.login);
// router.get("/login", authToken, usersController.hola);
// router.post("/logout", authToken, usersController.hola);

module.exports = router;
