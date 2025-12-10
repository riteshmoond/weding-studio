const Gallery = require("../Models/Gallery");

exports.uploadImage = async (req, res) => {
  const file = req.file.path;

  const img = await Gallery.create({ imageUrl: file });
  res.json(img);
};

exports.getImages = async (req, res) => {
  const data = await Gallery.find().sort({ createdAt: -1 });
  res.json(data);
};

exports.deleteImage = async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted Successfully" });
};
