// ************ Require's ************
const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/authToken");

// ************ Controller Require ************
const transactionsController = require("../controllers/transactionsController");

// Login
router.post("/add", authToken, transactionsController.addMoney);
// router.get("/login", authToken, usersController.hola);
// router.post("/logout", authToken, usersController.hola);

module.exports = router;
