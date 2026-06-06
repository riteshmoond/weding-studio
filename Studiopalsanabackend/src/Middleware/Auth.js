const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const cookieToken = req.cookies?.adminToken;
  const bearerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null;
  const token = bearerToken || cookieToken;

  if (!token) return res.status(401).json({ message: "Authentication required" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "development-secret-change-me");
    req.admin = req.user;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

