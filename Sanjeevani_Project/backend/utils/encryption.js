const crypto = require('crypto');
const fs = require('fs');

// Helper function for encryption
const encryptFile = (filePath, encryptedPath, callback) => {
  const cipher = crypto.createCipher('aes-256-cbc', 'encryption_key'); // Replace with your encryption key
  const input = fs.createReadStream(filePath);
  const output = fs.createWriteStream(encryptedPath);

  input.pipe(cipher).pipe(output);

  output.on('finish', () => callback(null));
  output.on('error', (err) => callback(err));
};

module.exports = {
  encryptFile
};
