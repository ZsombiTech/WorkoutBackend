const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");
const Auth = new authController();

router.post("/register", Auth.register);

router.post("/login", Auth.login);

module.exports = router;
