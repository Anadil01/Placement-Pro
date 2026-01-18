const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const analyzeRoutes = require("./routes/analyzeRoutes");
const authRoutes = require("./routes/authRoutes");


dotenv.config();

// Connect to Database
connectDB(); // <--- Run the function to connect to the database

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Routes 
app.use("/api/auth", authRoutes);
app.use("/api", analyzeRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the PlacementPro Backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

module.exports = app;