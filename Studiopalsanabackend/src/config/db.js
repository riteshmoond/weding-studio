const mongoose = require("mongoose");

const isValidMongoUrl = (value) =>
  /^mongodb(\+srv)?:\/\//i.test(value) &&
  !/<[^>]+>/.test(value) &&
  !value.includes("your-cluster") &&
  !value.includes("cluster0.example.mongodb.net") &&
  !value.includes("DB_USER") &&
  !value.includes("URL_ENCODED_PASSWORD");

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
      "MongoDB connection string is invalid or contains placeholders. Use a local URI like mongodb://127.0.0.1:27017/royal-wedding-studio for dev, or paste a complete MongoDB Atlas URI into MONGO_URL/MONGODB_URI."
    );
  }

  await mongoose.connect(mongoUrl);
  console.log("MongoDB Connected Successfully");
};

module.exports = connectDB;
