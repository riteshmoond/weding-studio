const express = require("express");
const { createPackage, getPackages, deletePackage } = require("../controllers/packageController");
const auth = require("../Middleware/Auth");

const router = express.Router();

router.post("/create", auth, createPackage);
router.get("/get", getPackages);
router.delete("/delete/:id", auth, deletePackage);

module.exports = router;
