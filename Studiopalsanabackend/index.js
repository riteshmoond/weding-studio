const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const cookieParser = require("cookie-parser");

const adminRoutes = require("./src/Routes/adminRoutes");
const galleryRoutes = require("./src/Routes/galleryRoutes");
const bookingRoutes = require("./src/Routes/bookingRoutes");
const messageRoutes = require("./src/Routes/messageRoutes");
const packageRoutes = require("./src/Routes/packageRoutes");


cookieParser();
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/admin", adminRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/packages", packageRoutes);

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;

