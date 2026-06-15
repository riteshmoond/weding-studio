const mongoose = require("mongoose");

const studioSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: "main", unique: true },
    studioName: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    youtube: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudioSettings", studioSettingsSchema);