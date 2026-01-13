const express = require("express");
const { login, logout } = require("../controllers/adminController");

const router = express.Router();

router.post("/login", login);     // admin login
router.post("/logout", logout);   // admin logout

module.exports = router;
