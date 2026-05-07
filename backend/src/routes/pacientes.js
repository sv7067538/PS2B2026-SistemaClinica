const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/', pacienteController.getAll);
router.get('/:id', pacienteController.getById);
router.post('/', pacienteController.create);
router.put('/:id', pacienteController.update);
router.delete('/:id', pacienteController.delete);
router.get('/buscar/ci/:ci', pacienteController.findByCI);

//Endpoint - Formulario paciente
router.post('/', async (req, res) => {
    const { 
        nombre, apellido, ci, telefono, direccion, email, 
        genero, fecha_nacimiento, tipo_sangre, alergias, id_usuario 
    } = req.body;

    try {
        const [result] = await db.query(
            `INSERT INTO paciente 
            (nombre, apellido, ci, telefono, direccion, email, 
             genero, fecha_nacimiento, tipo_sangre, alergias, id_usuario) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombre, apellido, ci, telefono, direccion, email, 
             genero, fecha_nacimiento, tipo_sangre, alergias, id_usuario]
        );
        
        res.json({ success: true, message: "Perfil completado", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al guardar" });
    }
});
module.exports = router;