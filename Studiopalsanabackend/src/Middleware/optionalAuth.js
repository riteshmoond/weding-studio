const jwt = require("jsonwebtoken");

module.exports = (req, _res, next) => {
  const token = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null;
  if (token) {
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET || "development-secret-change-me");
    } catch {
      req.user = null;
    }
  }
  next();
};

