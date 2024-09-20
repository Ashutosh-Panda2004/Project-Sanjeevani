const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const router = express.Router();

const SECRET_KEY = '380ac3cbc3f6b2805347e77f49a2093d78698d1f7ad292544abe9347bd38c82c'; // Replace with your secure secret key
const USERS_FILE_PATH = path.join(__dirname, '../data/users.json');

// Configure multer to handle form-data
const upload = multer();

// Route to handle login
router.post('/', upload.none(), async (req, res) => {
  console.log('Request Body:', req.body); // Debugging line

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  fs.readFile(USERS_FILE_PATH, 'utf8', async (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read file' });
    }

    const users = JSON.parse(data);
    const user = users.find(user => user.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  });
});

module.exports = router;

