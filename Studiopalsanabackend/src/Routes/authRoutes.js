const express = require("express");
const auth = require("../Middleware/Auth");
const rateLimit = require("../Middleware/rateLimit");
const { createFirstAdmin, login, me, register } = require("../controllers/authController");

const router = express.Router();
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts. Please try again after 15 minutes",
});
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many registration attempts. Please try again later",
});
const adminSetupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: "Too many admin setup attempts. Please try again later",
});

router.post("/register", registerLimiter, register);
router.post("/login", loginLimiter, login);
router.get("/me", auth, me);
router.post("/setup-admin", adminSetupLimiter, createFirstAdmin);

module.exports = router;
