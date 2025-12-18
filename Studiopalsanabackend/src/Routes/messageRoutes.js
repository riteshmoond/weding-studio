const express = require("express");
const { createMessage, getMessages } = require("../controllers/messageController");

const router = express.Router();

router.post("/create", createMessage);
router.get("/get", getMessages);

module.exports = router;
