const { db } = require('../config/database');
const bcrypt = require('bcryptjs');
const { generarCodigo, guardarCodigo, obtenerCodigo, eliminarCodigo } = require('../services/codeService');

// Paso 1: Solicitar código
const solicitarRecuperacion = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'El correo es requerido' });
    }

    try {
        // Verificar si el email existe
        const [users] = await db.query(
            'SELECT id_usuario, nombre, email FROM usuarios WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'No encontramos una cuenta con ese correo electrónico' 
            });
        }

        // Generar y guardar código
        const codigo = generarCodigo(email);
        guardarCodigo(email, codigo);

        res.json({ 
            success: true, 
            message: 'Código generado correctamente. Revisa la consola del servidor para verlo (modo pruebas).',
            devCode: process.env.NODE_ENV !== 'production' ? codigo : undefined
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};

// Paso 2: Verificar código
const verificarCodigo = async (req, res) => {
    const { email, codigo } = req.body;

    if (!email || !codigo) {
        return res.status(400).json({ success: false, message: 'Email y código son requeridos' });
    }

    const registro = obtenerCodigo(email);

    if (!registro) {
        return res.status(400).json({ 
            success: false, 
            message: 'No hay una solicitud de recuperación activa' 
        });
    }

    if (Date.now() > registro.expira) {
        eliminarCodigo(email);
        return res.status(400).json({ 
            success: false, 
            message: 'El código ha expirado. Solicita uno nuevo.' 
        });
    }

    if (registro.codigo !== codigo) {
        registro.intentos++;
        if (registro.intentos >= 3) {
            eliminarCodigo(email);
            return res.status(400).json({ 
                success: false, 
                message: 'Demasiados intentos fallidos. Solicita un nuevo código.' 
            });
        }
        return res.status(400).json({ 
            success: false, 
            message: `Código incorrecto. Te quedan ${3 - registro.intentos} intentos.` 
        });
    }

    // Código válido
    const tokenTemporal = Buffer.from(email).toString('base64') + '|' + Date.now();
    eliminarCodigo(email); 
    
    res.json({ 
        success: true, 
        message: 'Código verificado correctamente',
        token: tokenTemporal
    });
};

// Paso 3: Restablecer contraseña
const resetearPassword = async (req, res) => {
    const { email, token, nuevaPassword } = req.body;

    if (!email || !nuevaPassword || !token) {
        return res.status(400).json({ success: false, message: 'Datos incompletos' });
    }

    if (nuevaPassword.length < 6) {
        return res.status(400).json({ 
            success: false, 
            message: 'La contraseña debe tener al menos 6 caracteres' 
        });
    }

    // Verificar token
    const emailDecodificado = token.split(/(?=\d)/)[0];
    
    const partes = token.split('|');
if (partes.length !== 2) {
    return res.status(401).json({ success: false, message: 'Token inválido' });
}
const emailOriginal = Buffer.from(partes[0], 'base64').toString();

if (emailOriginal !== email) {
    return res.status(401).json({ success: false, message: 'Token inválido' });
}

    try {
        const hashedPassword = await bcrypt.hash(nuevaPassword, 10);
        
        await db.query(
            'UPDATE usuarios SET password = ? WHERE email = ?',
            [hashedPassword, email]
        );

        res.json({ 
            success: true, 
            message: 'Contraseña actualizada exitosamente' 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};

module.exports = {
    solicitarRecuperacion,
    verificarCodigo,
    resetearPassword
};