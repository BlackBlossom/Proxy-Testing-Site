const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// 1. Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 2. Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  },
});

// 3. File filter now allows SVG
const fileFilter = (req, file, cb) => {
  // Allowed extensions: jpeg, jpg, png, gif, svg
  const allowedExt = /jpeg|jpg|png|gif|svg/;
  const extname = allowedExt.test(path.extname(file.originalname).toLowerCase());
  // Allowed MIME types: image/jpeg, image/png, image/gif, image/svg+xml
  const mimeType = /jpeg|jpg|png|gif|svg\+xml/.test(file.mimetype);

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, png, gif, svg).'));
  }
};

const upload = multer({ storage, fileFilter });

// 4. Route remains the same, field name = "image"
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file received.' });
  }
  const imageUrl = `/public/uploads/${req.file.filename}`;
  return res.status(200).json({
    message: 'Image uploaded successfully',
    imageUrl,
  });
});

module.exports = router;
