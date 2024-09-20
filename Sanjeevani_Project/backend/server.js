// const express = require('express');
// const cors = require('cors');
// const fs = require('fs').promises;
// const path = require('path');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const multer = require('multer');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// const SECRET_KEY = '1c8cd4ec6e0a94ca79321f77b5e5b3188bd383150d0a9aba5220d10622dadb40effb2ed524d4327805c36e897569fcb1536f615566d2f4ead3a8877031fd1403';
// const USERS_FILE_PATH = path.join(__dirname, './data/users.json');
// const UPLOADS_FOLDER = path.join(__dirname, './public/uploads');

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, UPLOADS_FOLDER);
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage: storage });

// // Ensure uploads folder and users.json file exist
// async function ensureDirectoriesAndFiles() {
//   try {
//     await fs.mkdir(UPLOADS_FOLDER, { recursive: true });
//     console.log('Uploads folder created or already exists');

//     try {
//       await fs.access(USERS_FILE_PATH);
//     } catch (error) {
//       // If the file doesn't exist, create it with an empty array
//       await fs.writeFile(USERS_FILE_PATH, JSON.stringify([], null, 2));
//       console.log('users.json file created');
//     }
//   } catch (error) {
//     console.error('Error setting up directories and files:', error);
//   }
// }

// // Helper function to read users from file
// async function readUsersFile() {
//   try {
//     const data = await fs.readFile(USERS_FILE_PATH, 'utf-8');
//     return JSON.parse(data);
//   } catch (error) {
//     console.error('Error reading users file:', error);
//     return [];
//   }
// }

// // Helper function to write users to file
// async function writeUsersFile(users) {
//   await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2));
// }

// // Login route
// app.post('/api/login', async (req, res) => {
//   console.log('POST request for /api/login');
//   console.log('Login attempt with body:', req.body);

//   const { email, password } = req.body;
//   if (!email || !password) {
//     console.log('Missing email or password');
//     return res.status(400).json({ error: 'Email and password are required' });
//   }

//   try {
//     const users = await readUsersFile();

//     const user = users.find(u => u.email === email);
//     if (!user) {
//       console.log('User not found:', email);
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log('Incorrect password for user:', email);
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
//     res.status(200).json({ token });
//   } catch (error) {
//     console.error('Error handling login request:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Signup route
// app.post('/api/signup', upload.fields([
//   { name: 'insuranceCard', maxCount: 1 },
//   { name: 'medicalRecords', maxCount: 1 },
//   { name: 'consentForm', maxCount: 1 },
//   { name: 'signature', maxCount: 1 },
//   { name: 'governmentId', maxCount: 1 }
// ]), async (req, res) => {
//   console.log('POST request for /api/signup');
//   console.log('Signup attempt with body:', req.body);
//   console.log('Uploaded files:', req.files);

//   const { email, password, confirmPassword } = req.body;
//   if (!email || !password || !confirmPassword) {
//     console.log('Missing required fields');
//     return res.status(400).json({ error: 'Email, password, and confirm password are required' });
//   }

//   if (password !== confirmPassword) {
//     console.log('Passwords do not match');
//     return res.status(400).json({ error: 'Passwords do not match' });
//   }

//   try {
//     const users = await readUsersFile();

//     if (users.some(u => u.email === email)) {
//       console.log('User already exists:', email);
//       return res.status(400).json({ error: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     const newUser = {
//       email,
//       password: hashedPassword,
//       files: {},
//       ...req.body
//     };

//     // Save file paths
//     for (const key in req.files) {
//       if (req.files[key] && req.files[key][0]) {
//         newUser.files[key] = req.files[key][0].path;
//       }
//     }

//     users.push(newUser);

//     await writeUsersFile(users);
//     console.log('User registered successfully:', email);
//     res.status(200).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error handling signup request:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Start the server
// async function startServer() {
//   await ensureDirectoriesAndFiles();
  
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }

// startServer().catch(error => {
//   console.error('Failed to start server:', error);
// });





























































// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const cors = require('cors');
// const app = express();

// // Import routes
// const signupRoutes = require('./routes/signup');
// const loginRoutes = require('./routes/login');

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors()); // Enable CORS

// // Serve static files from public folder
// app.use(express.static(path.join(__dirname, 'public')));

// // Use routes
// app.use('/api/signup', signupRoutes);
// app.use('/api/login', loginRoutes);

// // Ensure directories exist
// const UPLOADS_FOLDER = path.join(__dirname, 'public', 'uploads');
// const ENCRYPTED_FOLDER = path.join(__dirname, 'public', 'encrypted');

// if (!fs.existsSync(UPLOADS_FOLDER)) {
//   fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
// }
// if (!fs.existsSync(ENCRYPTED_FOLDER)) {
//   fs.mkdirSync(ENCRYPTED_FOLDER, { recursive: true });
// }

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });






















// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const cors = require('cors');
// const app = express();

// // Import routes
// const signupRoutes = require('./routes/signup');
// const loginRoutes = require('./routes/login');

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors()); // Enable CORS

// // Serve static files from public folder
// app.use(express.static(path.join(__dirname, 'public')));

// // Use routes
// app.use('/api/signup', signupRoutes);
// app.use('/api/login', loginRoutes);

// // Ensure directories exist
// const UPLOADS_FOLDER = path.join(__dirname, 'public', 'uploads');
// const ENCRYPTED_FOLDER = path.join(__dirname, 'public', 'encrypted');

// if (!fs.existsSync(UPLOADS_FOLDER)) {
//   fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
// }
// if (!fs.existsSync(ENCRYPTED_FOLDER)) {
//   fs.mkdirSync(ENCRYPTED_FOLDER, { recursive: true });
// }

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });









const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const app = express();

// Import routes
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/api/signup', signupRoutes);
app.use('/api/login', loginRoutes);

// Ensure directories exist
const UPLOADS_FOLDER = path.join(__dirname, 'public', 'uploads');
const ENCRYPTED_FOLDER = path.join(__dirname, 'public', 'encrypted');

if (!fs.existsSync(UPLOADS_FOLDER)) {
  fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
}
if (!fs.existsSync(ENCRYPTED_FOLDER)) {
  fs.mkdirSync(ENCRYPTED_FOLDER, { recursive: true });
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});