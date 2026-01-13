const Booking = require("../Models/Booking");

exports.createBooking = async (req, res) => {
  const data = await Booking.create(req.body);
  res.json(data);
};

exports.getBookings = async (req, res) => {
  const data = await Booking.find().sort({ createdAt: -1 });
  res.json(data);
};

exports.updateBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const updated = await Booking.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ message: "Booking not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const exist = await Booking.findById(id);
    if (!exist) return res.status(404).json({ message: "Booking not found" });
    await Booking.findByIdAndDelete(id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
