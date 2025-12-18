const express = require("express");
const { loginAdmin } = require("../controllers/adminController");

const router = express.Router();

router.post("/login", loginAdmin);

router.get("/logout", (req, res) => {
  res.cookie("adminToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ message: "Logout successful" });
});


module.exports = router;
