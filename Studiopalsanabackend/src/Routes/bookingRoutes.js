const express = require("express");
const auth = require("../middleware/auth");
const {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBooking); // user
router.get("/", auth, getBookings); // admin
router.patch("/:id", auth, updateBooking); // admin
router.delete("/:id", auth, deleteBooking); // admin

module.exports = router;
