const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
      throw new Error("Missing MongoDB connection string. Set MONGO_URL in the .env file.");
    }

    await mongoose.connect(mongoUrl);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
