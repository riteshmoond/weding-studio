const express = require("express");
const { createFirstAdmin, login, register } = require("../controllers/authController");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/setup-admin", createFirstAdmin);

module.exports = router;

