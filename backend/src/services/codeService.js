const codigosRecuperacion = new Map();

const generarCodigo = (email) => {
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    
    guardarCodigo(email, codigo);
    
    console.log(`\n=========================================`);
    console.log(`CÓDIGO DE RECUPERACIÓN`);
    console.log(`Correo: ${email}`);
    console.log(`CÓDIGO: ${codigo}`);
    console.log(`Válido por 10 minutos`);
    console.log(`=========================================\n`);
    
    return codigo;
};

const guardarCodigo = (email, codigo) => {
    codigosRecuperacion.set(email, {
        codigo,
        expira: Date.now() + 10 * 60 * 1000,
        intentos: 0
    });
};

const obtenerCodigo = (email) => {
    return codigosRecuperacion.get(email);
};

const eliminarCodigo = (email) => {
    codigosRecuperacion.delete(email);
};

module.exports = {
    generarCodigo,
    guardarCodigo,
    obtenerCodigo,
    eliminarCodigo
};