const mongoose = require("mongoose");

const isValidMongoUrl = (value) =>
  /^mongodb(\+srv)?:\/\//i.test(value) &&
  !/<[^>]+>/.test(value) &&
  !value.includes("your-cluster");

const connectDB = async () => {
  const mongoUrls = [
    process.env.MONGO_URL?.trim(),
    process.env.MONGODB_URI?.trim(),
  ].filter(Boolean);
  const mongoUrl = mongoUrls.find(isValidMongoUrl);

  if (mongoUrls.length === 0) {
    throw new Error(
      "MongoDB connection string is missing. Set MONGO_URL or MONGODB_URI in the Render environment variables."
    );
  }

  if (!mongoUrl) {
    throw new Error(
      "MongoDB connection string is invalid or contains placeholders. In MongoDB Atlas, use Connect > Drivers and paste the complete URI into Render."
    );
  }

  await mongoose.connect(mongoUrl);
  console.log("MongoDB Connected Successfully");
};

module.exports = connectDB;
