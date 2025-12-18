const Package = require("../Models/Package");

exports.createPackage = async (req, res) => {
  const data = await Package.create(req.body);
  res.json(data);
};

exports.getPackages = async (req, res) => {
  const data = await Package.find();
  res.json(data);
};

exports.deletePackage = async (req, res) => {
  await Package.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
