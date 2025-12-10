const express = require("express");
const { createBooking, getBookings } = require("../controllers/bookingController");

const router = express.Router();

router.post("/create", createBooking);
router.get("/get", getBookings);

module.exports = router;
