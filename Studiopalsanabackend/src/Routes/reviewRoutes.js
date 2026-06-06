const express = require("express");
const auth = require("../Middleware/Auth");
const adminOnly = require("../Middleware/adminOnly");
const { createReview, deleteReview, getAllReviews, getApprovedReviews, updateReview } = require("../controllers/reviewController");

const router = express.Router();
router.get("/", getApprovedReviews);
router.post("/", createReview);
router.get("/admin", auth, adminOnly, getAllReviews);
router.patch("/:id", auth, adminOnly, updateReview);
router.delete("/:id", auth, adminOnly, deleteReview);
module.exports = router;

