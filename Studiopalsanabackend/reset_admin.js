const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
dotenv.config();

const User = require("./src/Models/User");

async function run() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB to reset admin password...");
  
  const email = "admin@royalweddingstudio.in";
  const password = "weddingstudio@9257";
  
  const hashedPassword = await bcrypt.hash(password, 12);
  const result = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { password: hashedPassword },
    { new: true }
  );
  
  if (result) {
    console.log(`Successfully updated password for ${email}`);
    // verify immediately
    const verify = await bcrypt.compare(password, result.password);
    console.log(`Verification after reset: ${verify}`);
  } else {
    console.log(`Admin user with email ${email} not found!`);
  }
  
  await mongoose.disconnect();
}
run().catch(console.error);
