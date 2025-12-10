const express = require("express");
const upload = require("../Middleware/Upload");
const auth = require("../Middleware/Auth");
const { uploadImage, getImages, deleteImage } = require("../controllers/galleryController");

const router = express.Router();

router.post("/upload", auth, upload.single("image"), uploadImage);
router.get("/get", getImages);
router.delete("/delete/:id", auth, deleteImage);

module.exports = router;
