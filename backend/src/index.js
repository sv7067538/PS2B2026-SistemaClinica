const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/database');

// Importar rutas
const pacienteRoutes = require('./routes/pacientes');
const medicoRoutes = require('./routes/medicos');
const citaRoutes = require('./routes/citas');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
    origin: 'http://localhost:3000', // Puerto de React
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/medicos', medicoRoutes);
app.use('/api/citas', citaRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Ruta raíz
app.get('/', (req, res) => {
    res.json({
        name: 'API Clínica Uroclinic',
        version: '1.0.0',
        endpoints: {
            pacientes: '/api/pacientes',
            medicos: '/api/medicos',
            citas: '/api/citas',
            health: '/api/health'
        }
    });
});

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Algo salió mal en el servidor',
        error: err.message 
    });
});

// Iniciar servidor
app.listen(PORT, async () => {
    console.log(`\n Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}`);
    await testConnection();
});