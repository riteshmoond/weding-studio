const express = require("express");
const auth = require("../Middleware/Auth");
const adminOnly = require("../Middleware/adminOnly");
const optionalAuth = require("../Middleware/optionalAuth");
const { createBooking, deleteBooking, getBookings, getStats, updateBooking } = require("../controllers/bookingController");

const router = express.Router();
router.post("/", optionalAuth, createBooking);
router.get("/", auth, getBookings);
router.get("/stats", auth, adminOnly, getStats);
router.patch("/:id", auth, adminOnly, updateBooking);
router.delete("/:id", auth, adminOnly, deleteBooking);

module.exports = router;
