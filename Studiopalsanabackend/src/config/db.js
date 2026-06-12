const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL?.trim();

  if (!mongoUrl) {
    throw new Error(
      "MONGO_URL is missing. Add the MongoDB Atlas connection string to the Render environment variables."
    );
  }

  if (
    !/^mongodb(\+srv)?:\/\//i.test(mongoUrl) ||
    /<[^>]+>/.test(mongoUrl) ||
    mongoUrl.includes("your-cluster")
  ) {
    throw new Error(
      "MONGO_URL is invalid or still contains placeholders. Copy the complete connection string from MongoDB Atlas and set it in Render."
    );
  }

  await mongoose.connect(mongoUrl);
  console.log("MongoDB Connected Successfully");
};

module.exports = connectDB;
