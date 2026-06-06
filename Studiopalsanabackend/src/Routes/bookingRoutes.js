const express = require("express");
const auth = require("../Middleware/Auth");
const adminOnly = require("../Middleware/adminOnly");
const customerOnly = require("../Middleware/customerOnly");
const optionalAuth = require("../Middleware/optionalAuth");
const { createBooking, deleteBooking, getBookings, getStats, updateBooking } = require("../controllers/bookingController");

const router = express.Router();
router.post("/", auth, customerOnly, createBooking);
router.get("/", auth, getBookings);
router.get("/stats", auth, adminOnly, getStats);
router.patch("/:id", auth, adminOnly, updateBooking);
router.delete("/:id", auth, adminOnly, deleteBooking);

module.exports = router;
