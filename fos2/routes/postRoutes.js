const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

// Mock data for posts
let posts = [
  { id: 1, title: "First Post", content: "This is my first blog post", author: "John Doe" },
  { id: 2, title: "Second Post", content: "This is another blog post", author: "Jane Doe" }
];

// Get all posts
router.get("/", (req, res) => {
  res.json(posts);
});

// Create a new post (requires JWT token)
router.post("/", verifyToken, (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const newPost = { id: posts.length + 1, title, content, author: req.user.email };
  posts.push(newPost);

  res.status(201).json({ message: "Post created successfully", post: newPost });
});

module.exports = router;
