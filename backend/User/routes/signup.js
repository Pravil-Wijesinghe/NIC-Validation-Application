// File: routes/signup.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const connection = require('../DBConnect'); // Your database connection

// Secret for JWT (use environment variables in production)
const JWT_SECRET = 'your_jwt_secret';

// Signup Route
router.post('/', async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;

    // Basic Validation
    if (!firstName || !lastName || !username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate email
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email address.' });
    }

    // Validate password (must be at least 8 characters long and include both letters and numbers)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: 'Password must be at least 8 characters long and include both letters and numbers.'
        });
    }

    // Check if the username or email already exists
    const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
    connection.query(checkUserQuery, [username, email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database query error.' });

        if (results.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists.' });
        }

        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the new user into the database
            const insertUserQuery = 'INSERT INTO users (f_name, l_name, username, email, password) VALUES (?, ?, ?, ?, ?)';
            connection.query(insertUserQuery, [firstName, lastName, username, email, hashedPassword], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Failed to create user.' });
                }

                // Generate a JWT token
                const token = jwt.sign({ id: result.insertId, username }, JWT_SECRET, { expiresIn: '1h' });

                // Send a success response with the token
                res.status(201).json({ message: 'User created successfully.', token });
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error.' });
        }
    });
});

module.exports = router;