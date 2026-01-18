// server/controllers/analyzeController.js
const OpenAI = require("openai");
const pdfParse = require("pdf-parse"); // <--- This will now work
const User = require("../models/User");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- HELPER: Extract Text ---
const extractText = async (req) => {
    const { manualText } = req.body;
    const resumeFile = req.file;

    // Priority 1: Manual Paste
    if (manualText && manualText.trim().length > 10) {
        console.log("Using Manual Text");
        return manualText;
    } 

    // Priority 2: PDF Upload
    if (resumeFile) {
        try {
            console.log("Parsing PDF...");
            const data = await pdfParse(resumeFile.buffer); // <--- Will work with v1.1.1
            return data.text;
        } catch (error) {
            console.error("PDF Parse Error:", error);
            return ""; 
        }
    }

    return "";
};

// --- ANALYZE RESUME ---
const analyzeResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const resumeText = await extractText(req);

    if (!resumeText || !jobDescription) {
        return res.status(400).json({ error: "Resume or Job Description missing." });
    }

    const prompt = `
      You are an ATS. 
      JOB DESCRIPTION: ${jobDescription}
      RESUME TEXT: ${resumeText}

      Return a JSON object EXACTLY like this:
      { "score": number, "missingKeywords": ["k1", "k2"], "advice": ["tip1", "tip2"] }
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo", // or "gpt-4o-mini"
    });

    // Parse JSON (handle potential string wrapping)
    let content = completion.choices[0].message.content;
    if (content.includes("```json")) {
        content = content.replace(/```json/g, "").replace(/```/g, "");
    }
    const analysis = JSON.parse(content);

    if (req.user) {
        await User.findByIdAndUpdate(req.user._id, {
            $push: { history: { company: "Job Scan", score: analysis.score, date: new Date() } }
        });
    }

    res.json(analysis);

  } catch (error) {
    console.error("Analysis Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// --- GENERATE EMAIL ---
const generateEmail = async (req, res) => {
    try {
        const { jobDescription } = req.body;
        const resumeText = await extractText(req);

        if (!resumeText || !jobDescription) {
            return res.status(400).json({ error: "Data missing for email generation." });
        }

        const prompt = `
            Write a cold email.
            JOB: ${jobDescription}
            RESUME: ${resumeText}
            Write a concise, professional email to the hiring manager.
        `;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
        });

        res.json({ email: completion.choices[0].message.content });

    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ error: "Email generation failed" });
    }
};

// --- FIX BULLET ---
const fixBulletPoint = async (req, res) => {
    try {
        const { bullet } = req.body;
        if (!bullet) return res.status(400).json({ error: "No text provided." });

        const prompt = `Rewrite this resume bullet to be result-oriented: "${bullet}"`;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
        });

        res.json({ fixed: completion.choices[0].message.content });

    } catch (error) {
        console.error("Bullet Fix Error:", error);
        res.status(500).json({ error: "Failed to fix bullet." });
    }
};

module.exports = { analyzeResume, generateEmail, fixBulletPoint };