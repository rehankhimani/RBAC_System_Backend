const express = require("express");
const router = express.Router();
const authController = require("../Services/authservice");

router.post("/login", authController.login);

module.exports = router;
