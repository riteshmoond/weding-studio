const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = null;

  if (req.cookies && req.cookies.adminToken) {
    token = req.cookies.adminToken;
  }

  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not Authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Auth OK:", decoded);
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or Expired Token" });
  }
};
