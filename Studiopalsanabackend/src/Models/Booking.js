const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      index: true,
      default: () => `RWS-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 90 + 10)}`,
    },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    city: { type: String, required: true, trim: true },
    eventType: {
      type: String,
      required: true,
      enum: ["Wedding", "Engagement", "Haldi", "Mehndi", "Reception", "Pre-Wedding", "Other"],
    },
    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true },
    venue: { type: String, required: true, trim: true },
    packageName: { type: String, required: true },
    requirements: [{ type: String }],
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Completed"],
      default: "Pending",
    },
    quotedAmount: { type: Number, default: 0 },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);

