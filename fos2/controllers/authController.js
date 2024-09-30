const jwt = require("jsonwebtoken");

// Temporary in-memory storage for users
let users = [];

// Register Controller
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Add the user to the in-memory storage
  const newUser = { name, email, password };  // In real scenario, we should hash passwords
  users.push(newUser);

  // Create JWT token
  const token = jwt.sign({ name, email }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "User registered successfully", token });
};

// Login Controller
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create JWT token for login
  const token = jwt.sign({ name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "Login successful", token });
};
