const TeamMember = require("../Models/TeamMember");

exports.getAll = async (req, res) => {
  try {
    const items = await TeamMember.find({}).sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to load team members" });
  }
};

exports.create = async (req, res) => {
  try {
    const payload = req.body || {};
    const item = await TeamMember.create(payload);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message || "Unable to create member" });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Member not found" });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message || "Unable to update member" });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await TeamMember.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete member" });
  }
};
