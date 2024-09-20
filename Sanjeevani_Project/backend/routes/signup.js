const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const UPLOADS_FOLDER = path.join(__dirname, '../public/uploads');
const ENCRYPTED_FOLDER = path.join(__dirname, '../public/encrypted');
const SECRET_KEY = '380ac3cbc3f6b2805347e77f49a2093d78698d1f7ad292544abe9347bd38c82c'; // Replace with your secure secret key
const USERS_FILE_PATH = path.join(__dirname, '../data/users.json');

// Ensure directories exist
if (!fs.existsSync(UPLOADS_FOLDER)) {
  fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
}
if (!fs.existsSync(ENCRYPTED_FOLDER)) {
  fs.mkdirSync(ENCRYPTED_FOLDER, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const { email } = req.body;
    const fileExtension = path.extname(file.originalname);
    const fileNameWithoutExt = path.basename(file.originalname, fileExtension);
    const newFileName = `${email}_${fileNameWithoutExt}${fileExtension}`;
    cb(null, newFileName);
  }
});

const upload = multer({ storage });

// Helper function for encryption
const encryptFile = (filePath, encryptedPath, callback) => {
  const cipher = crypto.createCipher('aes-256-cbc', 'encryption_key');
  const input = fs.createReadStream(filePath);
  const output = fs.createWriteStream(encryptedPath);

  input.pipe(cipher).pipe(output);

  output.on('finish', () => callback(null));
  output.on('error', (err) => callback(err));
};

// Route to handle signup
router.post('/', upload.fields([
  { name: 'insuranceCard' },
  { name: 'medicalRecords' },
  { name: 'consentForm' },
  { name: 'signature' },
  { name: 'governmentId' }
]), async (req, res) => {
  const { email, password, confirmPassword, ...rest } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Read existing users
    fs.readFile(USERS_FILE_PATH, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Unable to read file' });
      }

      let users = [];
      if (data) {
        users = JSON.parse(data);
      }

      // Check if email already exists
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already in use' });
      }

      // Create new user and save uploaded files
      const newUser = {
        email,
        password: hashedPassword,
        ...rest,
        files: req.files
      };

      users.push(newUser);

      // Write updated users to file
      fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ error: 'Unable to save user data' });
        }

        // Encrypt files and store in 'encrypted' folder
        const files = req.files;
        for (const field in files) {
          files[field].forEach((file) => {
            const unencryptedPath = path.join(UPLOADS_FOLDER, file.filename);
            const encryptedPath = path.join(ENCRYPTED_FOLDER, file.filename);

            encryptFile(unencryptedPath, encryptedPath, (err) => {
              if (err) {
                console.error('Error encrypting file:', err);
              }
            });
          });
        }

        res.status(201).json({ message: 'User data saved and files encrypted successfully' });
      });
    });
  } catch (err) {
    res.status(500).json({ error: 'Error saving user data' });
  }
});

module.exports = router;











































