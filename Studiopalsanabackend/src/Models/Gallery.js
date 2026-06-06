const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    category: { type: String, default: "Wedding" },
    album: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    publicId: { type: String, default: "" },
    mediaType: { type: String, enum: ["image", "video"], default: "image" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);

