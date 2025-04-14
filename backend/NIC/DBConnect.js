const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'metro.proxy.rlwy.net',
    port: 37617,
    user: 'root',
    password: 'GxvgeyiDjRbNGiMNEgdjiFGBYAAZUyQl',
    database: 'nic_validation'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Successfully Connected to Database.');
});

module.exports = connection;