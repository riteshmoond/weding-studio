const express = require("express");
const auth = require("../Middleware/Auth");
const adminOnly = require("../Middleware/adminOnly");
const { getSettings, updateSettings } = require("../controllers/settingsController");

const router = express.Router();

router.get("/", getSettings);
router.put("/", auth, adminOnly, updateSettings);

module.exports = router;