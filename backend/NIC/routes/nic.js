// File: routes/nic.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const connection = require('../DBConnect');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../NIC');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).fields([
  { name: 'file1', maxCount: 1 },
  { name: 'file2', maxCount: 1 },
  { name: 'file3', maxCount: 1 },
  { name: 'file4', maxCount: 1 },
]);

router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err); // Log Multer errors
        return res.status(400).json({ message: 'Multer error occurred during file upload.' });
      } else {
        console.error('Unknown error:', err); // Log other errors
        return res.status(500).json({ message: 'Unknown error occurred during file upload.' });
      }
    }

    console.log('Files received:', req.files);

    const files = req.files;
    if (!files || Object.keys(files).length !== 4) {
      return res.status(400).json({ message: 'Four files are required.' });
    }

    const results = [];
    let filesProcessed = 0;

    Object.values(files).forEach((fileArray) => {
      const file = fileArray[0];
      const filePath = file.path;
      const fileName = file.filename;

      // Process each CSV file
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          const nic = row['NIC']; // Assuming the CSV has a column named 'NIC'
          const nicData = validateAndParseNIC(nic);
          if (nicData) {
            results.push({ ...nicData, fileName });
          }
        })
        .on('end', () => {
          filesProcessed++;
          if (filesProcessed === 4) {
            // Insert the validated NIC data into the database once all files are processed
            if (results.length > 0) {
              const query = 'INSERT INTO nic (nic_number, birthday, age, gender, file_name) VALUES ?';
              const values = results.map((r) => [r.nic_number, r.birthday, r.age, r.gender, r.fileName]);
              connection.query(query, [values], (err, result) => {
                if (err) {
                  console.error('Database error:', err);
                  return res.status(500).json({ message: 'Database error.' });
                }
                res.status(200).json({ message: 'Files processed successfully!' });
              });
            } else {
              console.warn('No valid NIC data found in the files.');
              res.status(400).json({ message: 'No valid NIC data found in the files.' });
            }
          }
        })
        .on('error', (error) => {
          console.error('Error processing file:', error);
          return res.status(500).json({ message: 'Error processing files.' });
        });
    });
  });
});

// File: routes/nic.js
router.get('/data', (req, res) => {
    const query = 'SELECT * FROM nic';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Failed to retrieve data.' });
      }
      res.status(200).json(results);
    });
  });

  // Summary data route
router.get('/summary', (req, res) => {
  const query = `
      SELECT 
          COUNT(*) AS totalRecords,
          SUM(CASE WHEN gender = 'Male' THEN 1 ELSE 0 END) AS maleCount,
          SUM(CASE WHEN gender = 'Female' THEN 1 ELSE 0 END) AS femaleCount
      FROM nic`;

  connection.query(query, (err, results) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Failed to retrieve summary data.' });
      }

      res.status(200).json(results[0]);
  });
});

// Route to fetch all NIC data with optional filters
router.get('/data', (req, res) => {
  const { birthday, age, gender, file } = req.query;
  let query = 'SELECT * FROM nic WHERE 1=1';
  const queryParams = [];

  if (birthday) {
      query += ' AND birthday = ?';
      queryParams.push(birthday);
  }

  if (age) {
      query += ' AND age = ?';
      queryParams.push(age);
  }

  if (gender) {
      query += ' AND gender = ?';
      queryParams.push(gender);
  }

  if (file) {
      query += ' AND file_name = ?';
      queryParams.push(file);
  }

  connection.query(query, queryParams, (err, results) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Failed to retrieve NIC data.' });
      }

      res.status(200).json(results);
  });
});

router.get('/files', (req, res) => {
  const query = 'SELECT DISTINCT file_name FROM nic';
  connection.query(query, (err, results) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Failed to retrieve file names.' });
      }

      res.status(200).json(results.map(row => row.file_name));
  });
});

module.exports = router;


// Function to validate and parse the NIC
function validateAndParseNIC(nic) {
  let year, days, gender;
  if (nic.length === 10 && /[0-9]{9}[x|X|v|V]$/.test(nic)) {
    // Old NIC
    year = '19' + nic.substring(0, 2);
    days = parseInt(nic.substring(2, 5), 10);
    gender = days > 500 ? 'Female' : 'Male';
    if (days > 500) days -= 500;
  } else if (nic.length === 12 && /^[0-9]{12}$/.test(nic)) {
    // New NIC
    year = nic.substring(0, 4);
    days = parseInt(nic.substring(4, 7), 10);
    gender = days > 500 ? 'Female' : 'Male';
    if (days > 500) days -= 500;
  } else {
    return null;
  }

  const birthday = calculateBirthday(year, days);
  const age = new Date().getFullYear() - parseInt(year, 10);

  return { nic_number: nic, birthday, age, gender };
}

// Function to calculate the birthday from year and days
function calculateBirthday(year, days) {
  const months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let month = 0;

  while (days > months[month]) {
    days -= months[month];
    month++;
  }

  const day = days;
  const birthDate = new Date(year, month, day);
  return birthDate.toISOString().split('T')[0];
}

module.exports = router;
