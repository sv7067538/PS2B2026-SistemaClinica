const express = require('express');
const router = express.Router();
const Cita = require('../models/Cita');

// Obtener todas las citas
router.get('/', async (req, res) => {
    try {
        const citas = await Cita.getAll();
        res.json({ success: true, data: citas });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;