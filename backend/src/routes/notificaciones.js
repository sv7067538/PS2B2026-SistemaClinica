const express = require('express');
const router = express.Router();
const Notificacion = require('../models/Notificacion');

// Marcar todas como leídas
router.put('/usuario/:id_usuario/leer-todas', async (req, res) => {
    try {
        await Notificacion.marcarTodasLeidas(req.params.id_usuario);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// Obtener notificaciones del usuario
router.get('/:id_usuario', async (req, res) => {
    try {
        const notificaciones = await Notificacion.getByUsuario(req.params.id_usuario);
        const noLeidas = await Notificacion.contarNoLeidas(req.params.id_usuario);
        res.json({ success: true, data: notificaciones, noLeidas });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Marcar una como leída
router.put('/:id/leer', async (req, res) => {
    try {
        await Notificacion.marcarLeido(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});



module.exports = router;