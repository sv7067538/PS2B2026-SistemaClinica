const codigosRecuperacion = new Map();

const generarCodigo = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const guardarCodigo = (email, codigo) => {
    codigosRecuperacion.set(email, {
        codigo,
        expira: Date.now() + 10 * 60 * 1000, 
        intentos: 0
    });
    
    console.log(`\n=========================================`);
    console.log(`CÓDIGO DE RECUPERACIÓN: para ${email}`);
    console.log(`CÓDIGO: ${codigo}`);
    console.log(`Válido por 10 minutos`);
    console.log(`=========================================\n`);
    
    return codigo;
};

// Obtener código guardado
const obtenerCodigo = (email) => {
    return codigosRecuperacion.get(email);
};

// Eliminar código
const eliminarCodigo = (email) => {
    codigosRecuperacion.delete(email);
};

module.exports = {
    generarCodigo,
    guardarCodigo,
    obtenerCodigo,
    eliminarCodigo
};