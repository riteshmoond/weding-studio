const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
	cloudinary,
	params: { folder: "wedding-gallery", resource_type: "auto" },
});

module.exports = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    const allowed = file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/");
    callback(allowed ? null : new Error("Only image and video files are allowed"), allowed);
  },
});
