const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const cookieParser = require("cookie-parser");

// ROUTES
const adminRoutes = require("./src/Routes/adminRoutes");
const galleryRoutes = require("./src/Routes/galleryRoutes");
const bookingRoutes = require("./src/Routes/bookingRoutes");
const messageRoutes = require("./src/Routes/messageRoutes");
const packageRoutes = require("./src/Routes/packageRoutes");

dotenv.config();
connectDB();

const app = express();

// 🔥 MUST MIDDLEWARES
app.use(express.json());
app.use(cookieParser()); // ✅ VERY IMPORTANT

// 🔥 CORS CONFIG FOR COOKIE AUTH
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true,               // allow cookies
  })
);

// ROUTES
app.use("/api/admin", adminRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/packages", packageRoutes);

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;
