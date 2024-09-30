const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

dotenv.config();
const app = express();

app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({ extended: true }));  // For parsing form data

// Serve static files from "public"
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
