const Booking = require("../Models/Booking");

exports.createBooking = async (req, res) => {
  const data = await Booking.create(req.body);
  res.json(data);
};

exports.getBookings = async (req, res) => {
  const data = await Booking.find().sort({ createdAt: -1 });
  res.json(data);
};
