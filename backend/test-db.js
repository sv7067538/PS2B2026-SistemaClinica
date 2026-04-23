const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Error de conexión:', err.message);
        return;
    }
    console.log('✅ Conectado a la base de datos:', process.env.DB_NAME);
    
    // Probar consulta
    connection.query('SELECT COUNT(*) as total FROM paciente', (err, results) => {
        if (err) {
            console.log('⚠️ Tabla paciente vacía o no existe');
        } else {
            console.log('📊 Total de pacientes:', results[0].total);
        }
        connection.end();
    });
});