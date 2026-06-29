const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
dotenv.config();

const User = require("./src/Models/User");

async function run() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB.");
  const users = await User.find().select("+password");
  console.log("Found users count:", users.length);
  for (const u of users) {
    const isPassMatch = await bcrypt.compare("weddingstudio@9257", u.password);
    console.log(`User: name=${u.name}, email=${u.email}, role=${u.role}, isPassMatch=${isPassMatch}`);
  }
  await mongoose.disconnect();
}
run().catch(console.error);
