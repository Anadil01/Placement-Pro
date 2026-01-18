// server/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // No two users can have the same email
  },
  password: {
    type: String,
    required: true,
  },

  // --- NEW PROFILE FIELDS ---
  degree: { type: String, default: "" },
  university: { type: String, default: "" },
  gradYear: { type: String, default: "" },
  skills: { type: [String], default: [] }, // We will store skills as a list
  linkedin: { type: String, default: "" },
  // --------------------------
  // We will store their history here later!
  history: [
    {
      date: { type: Date, default: Date.now },
      company: String,
      score: Number,
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);