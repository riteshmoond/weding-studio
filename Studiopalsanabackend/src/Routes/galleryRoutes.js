const express = require("express");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  uploadImage,
  getImages,
  deleteImage,
} = require("../controllers/galleryController");

const router = express.Router();

router.get("/", getImages); // public
router.post("/upload", auth, upload.single("image"), uploadImage); // admin
router.delete("/:id", auth, deleteImage); // admin

module.exports = router;
