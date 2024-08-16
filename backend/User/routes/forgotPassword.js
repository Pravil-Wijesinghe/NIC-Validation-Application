// File: routes/forgotPassword.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const connection = require('../DBConnect');

// In-memory store for OTPs
const otpStore = {};

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service
    auth: {
        user: 'pravilwijesinghe@gmail.com', // Replace with your email
        pass: 'frwf wrft sscl djcv', // Replace with your email password pravilwijesinghe - frwf wrft sscl djcv
    },
});

// Generate a 4-digit OTP
function generateOTP() {
    return crypto.randomInt(1000, 9999).toString();
}

router.post('/', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    // Check if the email exists in the users table
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database query failed.' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Email is not matched.' });
        }

        // Generate and send OTP if email exists
        const otp = generateOTP(); // Generate the OTP

        // Store OTP in memory (valid for 5 minutes)
        otpStore[email] = {
            otp,
            expiresAt: Date.now() + 300000, // 5 minutes expiration
        };

        // Send the OTP to the user's email
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Failed to send email.' });
            }
            res.status(200).json({ message: 'OTP sent successfully.'});
        });
    });
});

// Route to validate OTP
router.post('/validate-otp', (req, res) => {

    console.log('Received request body:', req.body); // Log to see what is received

    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    const storedOtpData = otpStore[email];

    if (!storedOtpData) {
        return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    if (Date.now() > storedOtpData.expiresAt) {
        return res.status(400).json({ message: 'OTP has expired.' });
    }

    if (storedOtpData.otp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP.' });
    }

    // OTP is valid, clear it from memory
    delete otpStore[email];

    res.status(200).json({ message: 'OTP correctly entered.' });
});

module.exports = router;
