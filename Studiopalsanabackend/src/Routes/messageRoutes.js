const express = require("express");
const auth = require("../middleware/auth");
const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/messageController");

const router = express.Router();

// USER → send message
router.post("/", sendMessage);

// ADMIN → view messages
router.get("/", auth, getMessages);

// ADMIN → delete message
router.delete("/:id", auth, deleteMessage);

module.exports = router;
