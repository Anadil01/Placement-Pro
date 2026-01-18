// server/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --- HELPER: Generate Token ---
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// --- REGISTER USER ---
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// --- LOGIN USER ---
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// --- GET USER HISTORY ---
const getUserHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json(user.history.reverse());
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// --- 1. GET USER PROFILE ---
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // Don't send password back
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// --- 2. UPDATE USER PROFILE ---
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // Update fields if they exist in the request, otherwise keep old value
      user.name = req.body.name || user.name;
      user.degree = req.body.degree || user.degree;
      user.university = req.body.university || user.university;
      user.gradYear = req.body.gradYear || user.gradYear;
      user.linkedin = req.body.linkedin || user.linkedin;
      
      // Handle Skills (Convert "React, Node" string to Array)
      if (req.body.skills) {
          // If user sends string "React, Node", split it. If array, use it.
          user.skills = Array.isArray(req.body.skills) 
            ? req.body.skills 
            : req.body.skills.split(',').map(skill => skill.trim());
      }

      const updatedUser = await user.save();
      
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        degree: updatedUser.degree,
        skills: updatedUser.skills,
        token: generateToken(updatedUser._id), // Refresh token just in case
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Update failed" });
  }
};

// --- EXPORTS ---
module.exports = { 
  registerUser, 
  loginUser, 
  getUserHistory ,
  getUserProfile,  
    updateUserProfile
};