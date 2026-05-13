const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("E-Shelf API is running!");
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected!");
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port 5000`);
    });
})
.catch((error) => {
    console.log("Error:", error);
});