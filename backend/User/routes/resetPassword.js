// File: routes/resetPassword.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../DBConnect');

// Password validation function
function validatePassword(password) {
    // Must contain at least one number and one letter
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
}

// Route to reset the password
router.post('/', async (req, res) => {
    const { username, newPassword, confirmPassword } = req.body;

    // Check if all fields are provided
    if (!username || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Validate the password
    if (!validatePassword(newPassword)) {
        return res.status(400).json({
            message: 'Password must be at least 8 characters long and include both numbers and letters.',
        });
    }

    // Hash the new password
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        const query = 'UPDATE users SET password = ? WHERE username = ?';
        connection.query(query, [hashedPassword, username], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error occurred.' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Username not found.' });
            }

            res.status(200).json({ message: 'Password reset successfully. Please log in with your new password.' });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error hashing password.' });
    }
});

module.exports = router;
