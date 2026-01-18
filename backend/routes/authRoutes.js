// server/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserHistory,getUserProfile, updateUserProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// Route for Registration
router.post("/register", registerUser);

// Route for Login
router.post("/login", loginUser);

// Route for History (Protected)
router.get("/history", protect, getUserHistory);

router.route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

module.exports = router;