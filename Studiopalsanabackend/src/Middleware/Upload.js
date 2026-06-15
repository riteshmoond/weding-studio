const multer = require("multer");
const path = require("path");

const cloudName = process.env.CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
const cloudKey = process.env.CLOUD_KEY || process.env.CLOUDINARY_API_KEY;
const cloudSecret = process.env.CLOUD_SECRET || process.env.CLOUDINARY_API_SECRET;
let storage;

if (cloudName && cloudKey && cloudSecret) {
  const { CloudinaryStorage } = require("multer-storage-cloudinary");
  const cloudinary = require("../config/cloudinary");
  storage = new CloudinaryStorage({ cloudinary, params: { folder: "wedding-gallery", resource_type: "auto" } });
} else {
  // fallback to local disk storage (development)
  const uploadDir = path.join(__dirname, "..", "..", "upload");
  const diskStorage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`),
  });
  storage = diskStorage;
}

module.exports = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    const allowed = file.mimetype && (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/"));
    callback(allowed ? null : new Error("Only image and video files are allowed"), allowed);
  },
});
