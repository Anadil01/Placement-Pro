// server/routes/analyzeRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { analyzeResume, generateEmail, fixBulletPoint } = require("../controllers/analyzeController");
const { protect } = require("../middleware/authMiddleware"); // <--- Imported correctly

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- FIX IS HERE: Add 'protect' before 'upload' ---
router.post("/analyze", protect, upload.single("resume"), analyzeResume);
router.post("/email", protect, upload.single("resume"), generateEmail);
// --------------------------------------------------

router.post("/fix-bullet", protect, upload.none(), fixBulletPoint);

module.exports = router;