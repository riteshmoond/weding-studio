const express = require("express");
const auth = require("../Middleware/Auth");
const {
  createPackage,
  getPackages,
  deletePackage,
  updatePackage,
} = require("../controllers/packageController");
const adminOnly = require("../Middleware/adminOnly");

const router = express.Router();

router.get("/", getPackages); // public
router.post("/", auth, adminOnly, createPackage); // admin
router.patch("/:id", auth, adminOnly, updatePackage);
router.delete("/:id", auth, adminOnly, deletePackage); // admin

module.exports = router;
