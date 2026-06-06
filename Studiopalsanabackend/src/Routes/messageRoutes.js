const express = require("express");
const auth = require("../Middleware/Auth");
const adminOnly = require("../Middleware/adminOnly");
const customerOnly = require("../Middleware/customerOnly");
const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/messageController");

const router = express.Router();

// USER → send message
router.post("/", auth, customerOnly, sendMessage);

// ADMIN → view messages
router.get("/", auth, adminOnly, getMessages);

// ADMIN → delete message
router.delete("/:id", auth, adminOnly, deleteMessage);

module.exports = router;
