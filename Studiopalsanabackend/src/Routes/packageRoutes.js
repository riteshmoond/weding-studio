const express = require("express");
const auth = require("../middleware/auth");
const {
  createPackage,
  getPackages,
  deletePackage,
} = require("../controllers/packageController");

const router = express.Router();

router.get("/", getPackages); // public
router.post("/", auth, createPackage); // admin
router.delete("/:id", auth, deletePackage); // admin

module.exports = router;