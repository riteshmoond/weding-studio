const Admin = require("../Models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  // const match = await bcrypt.compare(password, admin.password);
  // if (!match) return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // ⭐ Set cookie
  res.cookie("adminToken", token, {
    httpOnly: true,
    secure: false, // LOCALHOST = false, DEPLOYED = true
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({ message: "Login successful" });
} catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};