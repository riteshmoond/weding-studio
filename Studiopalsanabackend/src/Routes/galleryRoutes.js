const express = require("express");
const auth = require("../Middleware/Auth");
const upload = require("../Middleware/Upload");
const adminOnly = require("../Middleware/adminOnly");
const {
  uploadImage,
  getImages,
  deleteImage,
} = require("../controllers/galleryController");

const router = express.Router();

router.get("/", getImages); // public
router.post("/upload", auth, adminOnly, upload.single("image"), uploadImage); // admin
router.delete("/:id", auth, adminOnly, deleteImage); // admin

module.exports = router;
