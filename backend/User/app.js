// File: app.js (Main entry point for the User service)
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const loginRoute = require('./routes/login.js'); // Import the login route
const forgotPasswordRoute = require('./routes/forgotPassword'); // Import the forgot password route
const resetPasswordRoute = require('./routes/resetPassword'); // Import the reset password route

app.use(cors()); // Use the cors middleware
app.use(bodyParser.json()); // Parse JSON requests

app.use('/login', loginRoute); // Use the login route
app.use('/forgot-password', forgotPasswordRoute); // Use the forgot password route
app.use('/reset-password', resetPasswordRoute); // Use the reset password route

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`User service running on port ${PORT}`);
});


