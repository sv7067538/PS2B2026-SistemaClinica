const express = require('express');
const router = express.Router();
const Cita = require('../models/Cita');
const Notificacion = require('../models/Notificacion');

// Obtener todas las citas
router.get('/', async (req, res) => {
    try {
        const citas = await Cita.getAll();
        res.json({ success: true, data: citas });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Obtener citas por paciente
router.get('/paciente/:id_paciente', async (req, res) => {
    try {
        const citas = await Cita.getByPaciente(req.params.id_paciente);
        res.json({ success: true, data: citas });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Crear cita
router.post('/', async (req, res) => {
    console.log('=== CREAR CITA ===');
    console.log('Body recibido:', req.body);
    try {
        const { id_paciente, id_medico, fecha, hora, motivo, id_usuario } = req.body;

        if (!id_paciente || !id_medico || !fecha || !hora) {
            return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
        }

        const id = await Cita.create({ id_paciente, id_medico, fecha, hora, motivo });

        if (id_usuario) {
            await Notificacion.create(
                id_usuario,
                'Cita programada',
                `Tu cita ha sido programada para el ${fecha} a las ${hora}`
            );
        }

        res.status(201).json({ success: true, message: 'Cita creada', id_cita: id });
    } catch (error) {
        console.error('Error creando cita:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Cancelar cita
router.put('/:id/cancelar', async (req, res) => {
    try {
        const ok = await Cita.updateEstado(req.params.id, 'Cancelada');
        if (!ok) return res.status(404).json({ success: false, message: 'Cita no encontrada' });
        res.json({ success: true, message: 'Cita cancelada' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Actualizar estado
router.put('/:id/estado', async (req, res) => {
    try {
        const { estado } = req.body;
        if (!estado) return res.status(400).json({ success: false, message: 'Estado requerido' });

        const ok = await Cita.updateEstado(req.params.id, estado);
        if (!ok) return res.status(404).json({ success: false, message: 'Cita no encontrada' });
        res.json({ success: true, message: 'Estado actualizado' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;