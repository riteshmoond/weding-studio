const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
	cloudinary,
	params: { folder: "wedding-gallery" },
});

module.exports = multer({ storage });
