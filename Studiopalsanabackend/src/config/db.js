const mongoose = require("mongoose");

const isValidMongoUrl = (value) =>
  /^mongodb(\+srv)?:\/\//i.test(value) &&
  !/<[^>]+>/.test(value) &&
  !value.includes("your-cluster") &&
  !value.includes("cluster0.example.mongodb.net") &&
  !value.includes("DB_USER") &&
  !value.includes("URL_ENCODED_PASSWORD");

const isLocalMongoUrl = (value) =>
  /(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?(?:\/|$)/i.test(value);

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

  if (process.env.NODE_ENV === "production" && isLocalMongoUrl(mongoUrl)) {
    throw new Error(
      "MONGO_URL points to localhost, which is not available on Render. Replace it with a MongoDB Atlas mongodb+srv:// URI in Render Environment."
    );
  }

  try {
    await mongoose.connect(mongoUrl, { serverSelectionTimeoutMS: 15000 });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    const reason = error?.message || "Unknown MongoDB connection error";
    throw new Error(
      `Could not connect to MongoDB: ${reason}. Check the Render MONGO_URL/MONGODB_URI value and allow Render access in MongoDB Atlas Network Access.`,
      { cause: error }
    );
  }
};

module.exports = connectDB;
