const express = require('express');
const { createUser, findUserByEmail } = require('../models/User');
const router = express.Router();

// Register
router.post('/register', (req, res) => {
  const { name, email, password, role, phone, vehicleNumber, vehicleType } = req.body;
  
  // Check if user exists
  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }
  
  // Create user
  const user = createUser({ name, email, password, role, phone, vehicleNumber, vehicleType });
  
  res.status(201).json({ 
    message: 'User registered successfully',
    user: { id: user.id, name, email, role }
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = findUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  res.json({ 
    message: 'Login successful',
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
});

module.exports = router;