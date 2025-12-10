const Message = require("../Models/Message");

exports.createMessage = async (req, res) => {
  const data = await Message.create(req.body);
  res.json(data);
};

exports.getMessages = async (req, res) => {
  const data = await Message.find().sort({ createdAt: -1 });
  res.json(data);
};
