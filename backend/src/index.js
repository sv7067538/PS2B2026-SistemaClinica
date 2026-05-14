const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { db, testConnection } = require('./config/database');

// Importar rutas
const pacienteRoutes = require('./routes/pacientes');
const medicoRoutes = require('./routes/medicos');
const citaRoutes = require('./routes/citas');
const passwordRoutes = require('./routes/passwordRoutes'); 
const especialidadRoutes = require('./routes/especialidades');
const notificacionRoutes = require('./routes/notificaciones');

const app = express();
const PORT = process.env.PORT || 5000;


// Middlewares
app.use(cors({
    origin: 'http://localhost:5173',  
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== AUTENTICACIÓN ====================

// Endpoint de registro (signup)
app.post('/api/signup', async (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    try {
        // Verificar si el email ya existe
        const [existingUser] = await db.query('SELECT id_usuario FROM usuarios WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insertar nuevo usuario
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, "paciente")',
            [nombre, email, hashedPassword]
        );

        res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error en signup:', error);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
});
app.use('/api/notificaciones', notificacionRoutes);
app.use('/api/especialidades', especialidadRoutes);
// Endpoint de login (CON LOGS)
app.post('/api/login', async (req, res) => {
    console.log('=== LOGIN ===');
    console.log('Email recibido:', req.body.email);
    console.log('Password recibida:', req.body.password ? '***' : 'No');

    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Error: Email o contraseña faltante');
        return res.status(400).json({ success: false, field: 'general', message: 'Email y contraseña requeridos' });
    }

    try {
        // Verificar conexión a BD
        console.log('Buscando usuario en BD...');
        
        const [users] = await db.query('SELECT id_usuario, nombre, email, password, rol FROM usuarios WHERE email = ?', [email]);
        
        console.log('Usuario encontrado:', users.length > 0);

        if (users.length === 0) {
            console.log('Error: Email no registrado');
            return res.status(401).json({ success: false, field: 'email', message: 'Correo incorrecto' });
        }

        const user = users[0];
        console.log('Verificando contraseña...');
        
        const validPassword = await bcrypt.compare(password, user.password);
        console.log('Contraseña válida:', validPassword);

        if (!validPassword) {
            console.log('Error: Contraseña incorrecta');
            return res.status(401).json({ success: false, field: 'password', message: 'Contraseña incorrecta' });
        }

        console.log('Generando token...');
        const token = jwt.sign(
            { id: user.id_usuario, nombre: user.nombre, email: user.email, rol: user.rol },
            process.env.JWT_SECRET || 'clinica_uroclinic_secret',
            { expiresIn: '24h' }
        );

        let redirect = '/dashboard';
        if (user.rol === 'admin') redirect = '/admin/dashboard';
        else if (user.rol === 'medico') redirect = '/medico/dashboard';

        console.log('Login exitoso para:', email);
        
        res.json({
            success: true,
            token,
            user: { id: user.id_usuario, nombre: user.nombre, email: user.email, rol: user.rol },
            redirect
        });
    } catch (error) {
        console.error('Error en login:', error);
        console.error('Mensaje:', error.message);
        res.status(500).json({ success: false, field: 'general', message: 'Error del servidor: ' + error.message });
    }
});
// ==================== PACIENTE ====================
// Endpoint para verificar si el paciente tiene perfil completo
app.get('/api/pacientes/usuario/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    
    try {
        const [paciente] = await db.query(
            'SELECT * FROM paciente WHERE id_usuario = ?',
            [id_usuario]
        );
        
        res.json({ 
            completado: paciente.length > 0,
            paciente: paciente.length > 0 ? paciente[0]:null
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ completado: false, error: error.message });
    }
});
// ==================== RUTAS ====================

// Rutas existentes
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/medicos', medicoRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/password', passwordRoutes);

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
            signup: '/api/signup',
            login: '/api/login',
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