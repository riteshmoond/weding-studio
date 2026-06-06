const Booking = require("../Models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      customer: req.user?.role === "customer" ? req.user.id : null,
    });
    return res.status(201).json({
      message: "Booking request submitted",
      bookingId: booking.bookingId,
      booking,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message || "Invalid booking details" });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const query = req.user.role === "admin" ? {} : { customer: req.user.id };
    return res.json(await Booking.find(query).sort({ createdAt: -1 }));
  } catch {
    return res.status(500).json({ message: "Could not load bookings" });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const allowed = ["status", "quotedAmount", "eventDate", "eventTime", "venue", "packageName", "requirements", "notes"];
    const update = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    const booking = await Booking.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    return res.json(booking);
  } catch (error) {
    return res.status(400).json({ message: error.message || "Could not update booking" });
  }
};

exports.deleteBooking = async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  return res.json({ message: "Booking deleted" });
};

exports.getStats = async (req, res) => {
  const [totalBookings, pendingBookings, completedEvents, revenueResult] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ status: "Pending" }),
    Booking.countDocuments({ status: "Completed" }),
    Booking.aggregate([{ $match: { status: { $in: ["Approved", "Completed"] } } }, { $group: { _id: null, total: { $sum: "$quotedAmount" } } }]),
  ]);
  return res.json({ totalBookings, pendingBookings, completedEvents, totalRevenue: revenueResult[0]?.total || 0 });
};
