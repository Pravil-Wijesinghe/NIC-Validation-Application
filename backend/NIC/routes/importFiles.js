// File: routes/importFiles.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadDirectory = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.csv') {
            return cb(new Error('Only CSV files are allowed.'));
        }
        cb(null, true);
    },
    limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
}).array('files', 4); // Allow up to 4 files

// Route to handle file uploads
router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(200).json({ message: 'Files uploaded successfully.' });
    });
});

module.exports = router;
