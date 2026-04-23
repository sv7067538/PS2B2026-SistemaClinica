const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

const db = pool.promise();

const testConnection = async () => {
    try {
        const [result] = await db.query('SELECT 1');
        console.log('Base de datos conectada exitosamente');
        return true;
    } catch (error) {
        console.error('Error al conectar la base de datos:', error.message);
        return false;
    }
};

module.exports = { db, testConnection };