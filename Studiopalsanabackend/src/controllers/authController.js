const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

function createToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET || "development-secret-change-me",
    { expiresIn: "7d" }
  );
}

function sessionResponse(user) {
  return {
    token: createToken(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
}

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password || password.length < 6) {
      return res.status(400).json({ message: "Name, email and a 6+ character password are required" });
    }
    if (await User.findOne({ email: email.toLowerCase() })) {
      return res.status(409).json({ message: "Email is already registered" });
    }
    const user = await User.create({
      name,
      email,
      phone,
      password: await bcrypt.hash(password, 12),
      role: "customer",
    });
    return res.status(201).json(sessionResponse(user));
  } catch (error) {
    return res.status(500).json({ message: "Could not create account" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: String(email).toLowerCase() }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    return res.json(sessionResponse(user));
  } catch (error) {
    return res.status(500).json({ message: "Login failed" });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User account no longer exists" });
    }
    return res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch {
    return res.status(500).json({ message: "Could not restore session" });
  }
};

exports.createFirstAdmin = async (req, res) => {
  try {
    if (await User.exists({ role: "admin" })) {
      return res.status(403).json({ message: "Admin account already exists" });
    }
    const setupKey = req.headers["x-setup-key"];
    if (!process.env.ADMIN_SETUP_KEY || setupKey !== process.env.ADMIN_SETUP_KEY) {
      return res.status(403).json({ message: "Invalid setup key" });
    }
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 12),
      role: "admin",
    });
    return res.status(201).json(sessionResponse(user));
  } catch (error) {
    return res.status(500).json({ message: "Could not create admin" });
  }
};
