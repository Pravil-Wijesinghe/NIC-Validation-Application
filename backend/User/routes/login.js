// File: routes/login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../DBConnect'); // Import the DB connection

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    const query = 'SELECT * FROM users WHERE username = ?';
    connection.query(query, [username], async (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ message: "Database query failed." });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        const user = results[0];
        try {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid username or password." });
            }

            // On successful login, return success and redirect
            return res.status(200).json({ message: "Login successful.", redirectTo: "/ImportFiles" });
        } catch (error) {
            console.error("Error during password comparison:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    });
});

module.exports = router;
    