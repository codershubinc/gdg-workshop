const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
    origin: [
        "http://127.0.0.1:5500",
        "https://gdg-workshop-ml2v.vercel.app",
        "https://gdgworkshopweb.netlify.app"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.options("*", cors());
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ DB Error:", err));

// Schema
const registrationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    college: { type: String, required: true },
    year: { type: String, required: true },
    branch: { type: String, required: true },
    event: { type: String, required: true }
});

// Model
const Registration = mongoose.model("Registration", registrationSchema);

// API Route
app.post("/register", async (req, res) => {
    try {

        const newUser = new Registration(req.body);
        await newUser.save();

        res.json({
            message: "🎉 Registration Successful!"
        });

    } catch (err) {

        res.status(500).json({
            message: "❌ Error Saving Data"
        });

    }
});

// Server Start
app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});