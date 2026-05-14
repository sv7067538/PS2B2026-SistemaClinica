const express = require('express');
const router = express.Router();
const Medico = require('../models/Medico');

// Obtener todos los médicos
router.get('/', async (req, res) => {
    try {
        const medicos = await Medico.getAll();
        res.json({ success: true, data: medicos });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
router.get('/especialidad/:id', async (req, res) => {
    try {
        const { db } = require('../config/database');
        const [rows] = await db.query(
            'SELECT id_medico, nombre, apellido FROM personal_medico WHERE id_especialidad = ?',
            [req.params.id]
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
module.exports = router;