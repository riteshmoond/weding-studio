const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db");
const seedAdmin = require("./src/utils/seedAdmin");
const adminRoutes = require("./src/Routes/adminRoutes");
const galleryRoutes = require("./src/Routes/galleryRoutes");
const bookingRoutes = require("./src/Routes/bookingRoutes");
const messageRoutes = require("./src/Routes/messageRoutes");
const packageRoutes = require("./src/Routes/packageRoutes");
const authRoutes = require("./src/Routes/authRoutes");
const reviewRoutes = require("./src/Routes/reviewRoutes");
const teamRoutes = require("./src/Routes/teamRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use("/api/admin", adminRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/team", teamRoutes);
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use((err, req, res, _next) => {
  console.error("Global error handler:", err && (err.stack || err.message || err));

  // Multer file upload errors
  if (err && err.name === "MulterError") {
    return res.status(400).json({ message: err.message || "File upload error" });
  }

  // Cloudinary or file-storage errors often carry a message
  if (err && err.message && (err.message.toLowerCase().includes("cloudinary") || err.message.toLowerCase().includes("upload"))) {
    return res.status(500).json({ message: err.message });
  }

  // Default
  return res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  await seedAdmin();
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

startServer().catch((error) => {
  console.error("Server startup failed:", error);
  process.exit(1);
});

module.exports = app;
