const Review = require("../Models/Review");

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    return res.status(201).json({ message: "Review submitted for approval", review });
  } catch (error) {
    return res.status(400).json({ message: error.message || "Invalid review" });
  }
};
exports.getApprovedReviews = async (_req, res) =>
  res.json(await Review.find({ status: "Approved" }).sort({ createdAt: -1 }));
exports.getAllReviews = async (_req, res) =>
  res.json(await Review.find().sort({ createdAt: -1 }));
exports.updateReview = async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
  if (!review) return res.status(404).json({ message: "Review not found" });
  return res.json(review);
};
exports.deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  return res.json({ message: "Review deleted" });
};

