const bcrypt = require("bcryptjs");
const User = require("../Models/User");

module.exports = async function seedAdmin() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME = "Studio Admin" } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return;
  if (ADMIN_PASSWORD.length < 8) {
    console.warn("ADMIN_PASSWORD must contain at least 8 characters; admin seed skipped.");
    return;
  }
  if (await User.exists({ email: ADMIN_EMAIL.toLowerCase() })) return;
  await User.create({
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    password: await bcrypt.hash(ADMIN_PASSWORD, 12),
    role: "admin",
  });
  console.log("Initial admin account created.");
};

