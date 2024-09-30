const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// POST route for register
router.post("/register", register);

// POST route for login
router.post("/login", login);

module.exports = router;
