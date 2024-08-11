// File: routes/forgotPassword.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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

// Route to handle email submission
router.post('/', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    const otp = generateOTP(); // Generate the OTP

    // Send the OTP to the user's email
    const mailOptions = {
        from: 'pravilwijesinghe@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Failed to send email.' });
        }
        res.status(200).json({ message: 'OTP sent successfully.'}); // You can return the OTP for debugging but avoid it in production
    });
});

module.exports = router;
