const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'yamabiko.proxy.rlwy.net',
    port: 40551,
    user: 'root',
    password: 'aBccEVSzMCkLUjaWxWaPRxebUVfCNLrD',
    database: 'user'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Successfully Connected to Database.');
});

module.exports = connection;