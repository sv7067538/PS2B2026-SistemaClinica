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

module.exports = router;