// File: api-gateway/index.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

// Port the API Gateway will listen on
const PORT = process.env.PORT || 3003;

// Proxy configuration
app.use('/nic', createProxyMiddleware({
    target: 'http://localhost:3002', // NIC service
    changeOrigin: true,
    pathRewrite: {
        '^/nic': '/', // Remove /nic prefix when forwarding to NIC service
    },
}));

app.use('/user', createProxyMiddleware({
    target: 'http://localhost:3000', // User service
    changeOrigin: true,
    pathRewrite: {
        '^/user': '/', // Remove /user prefix when forwarding to User service
    },
}));

// Forward all frontend requests to frontend service
app.use('/', createProxyMiddleware({
    target: 'http://localhost:3001', // Frontend service
    changeOrigin: true,
}));

// Health check for API gateway
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'API Gateway is running' });
});

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});