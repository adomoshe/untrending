const mysql = require('mysql');
let connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        port: 5000,
        user: 'root',
        password: '',
        database: 'untrending_db'
    });
};

module.exports = connection;