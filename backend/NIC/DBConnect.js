const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'nic-nic-validation.g.aivencloud.com',
    port: 12236,
    user: 'avnadmin',
    password: 'AVNS__cDzUrZTekLb5ZuGuCo',
    database: 'nic_validation'
    // host: 'localhost',
    // user: 'root',
    // password: 'P@R#A$V%I&L2002',
    // database: 'nic_validation'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Successfully Connected to Database.');
});

module.exports = connection;