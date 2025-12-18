const Gallery = require("../Models/Gallery");

exports.uploadImage = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Not Authenticated" });

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const data = await Gallery.create({ imageUrl: req.file.path });
    return res.status(201).json(data);
  } catch (err) {
    console.error("uploadImage error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getImages = async (req, res) => {
  try {
    const data = await Gallery.find().sort({ createdAt: -1 });
    return res.json(data);
  } catch (err) {
    console.error("getImages error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Not Authenticated" });

    const id = req.params.id;
    const img = await Gallery.findById(id);
    if (!img) return res.status(404).json({ message: "Image not found" });

    await Gallery.findByIdAndDelete(id);
    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("deleteImage error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
