const Gallery = require("../Models/Gallery");

exports.uploadImage = async (req, res) => {
  try {
    if (!req.admin) return res.status(401).json({ message: "Not Authenticated" });

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("gallery upload - req.file:", req.file && {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      filename: req.file.filename,
    });
    console.log("gallery upload - req.body:", req.body);

    // support different storage adapters (multer-storage-cloudinary etc.)
    const isRemoteAsset = Boolean(req.file.path && /^https?:\/\//i.test(req.file.path));
    const baseUrl = `${req.headers["x-forwarded-proto"] || req.protocol}://${req.get("host")}`;
    const imageUrl = isRemoteAsset
      ? (req.file.path || req.file.secure_url || req.file.url)
      : `${baseUrl}/upload/${req.file.filename}`;
    if (!imageUrl) return res.status(500).json({ message: "Uploaded file missing URL" });

    const data = await Gallery.create({
      imageUrl,
      publicId: req.file.filename || "",
      title: req.body.title || "",
      category: req.body.category || "Wedding",
      album: req.body.album || "",
      mediaType: req.file.mimetype?.startsWith("video/") ? "video" : "image",
    });
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
    if (!req.admin) return res.status(401).json({ message: "Not Authenticated" });

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
