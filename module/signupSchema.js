const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["user", "garage"] }, // role added with validation
    image: { type: String, required: false } // optional, in case you use it later
  },
  { timestamps: true }
);

const User = mongoose.model("User", signupSchema);
module.exports = User;
