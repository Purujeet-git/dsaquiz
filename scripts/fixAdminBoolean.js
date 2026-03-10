// scripts/fixAdminBoolean.js
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
    isAdmin: Boolean,
    level: Number,
    totalXP: Number,
    streakCount: Number,
}, { timestamps: true, strict: false });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function fixAdminBoolean(email) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // console.log("✅ Connected to MongoDB");

    const user = await User.findOneAndUpdate(
      { email },
      { isAdmin: true }, // ✅ Set as boolean, not string
      { new: true }
    );

    if (!user) {
      // console.log("❌ User not found");
    } else {
      // console.log("✅ Fixed admin field:");
      // console.log(`  Email: ${user.email}`);
      // console.log(`  isAdmin: ${user.isAdmin} (type: ${typeof user.isAdmin})`);
    }

    await mongoose.connection.close();
  } catch (error) {
    // console.error("❌ Error:", error);
    process.exit(1);
  }
}

const email = process.argv[2] || "purujeetkr2005@gmail.com";
fixAdminBoolean(email);