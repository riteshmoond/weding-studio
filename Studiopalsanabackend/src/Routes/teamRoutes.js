const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const auth = require("../Middleware/Auth");
const adminOnly = require("../Middleware/adminOnly");

// Public: list team members
router.get("/", teamController.getAll);

// Admin: create/update/delete
router.post("/", auth, adminOnly, teamController.create);
router.patch("/:id", auth, adminOnly, teamController.update);
router.delete("/:id", auth, adminOnly, teamController.remove);

module.exports = router;
