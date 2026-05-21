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
// Obtener citas por médico
router.get('/medico/:id_medico', async (req, res) => {
    try {
        const { db } = require('../config/database');
        const [rows] = await db.query(
            `SELECT c.*, p.nombre as paciente_nombre, p.apellido 
             FROM citas c
             JOIN paciente p ON c.id_paciente = p.id_paciente
             WHERE c.id_medico = ?
             ORDER BY c.fecha DESC`,
            [req.params.id_medico]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Confirmar cita
router.put('/:id/confirmar', async (req, res) => {
    try {
        const ok = await Cita.updateEstado(req.params.id, 'Confirmada');
        if (!ok) return res.status(404).json({ success: false, message: 'Cita no encontrada' });
        res.json({ success: true, message: 'Cita confirmada' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Completar cita
router.put('/:id/completar', async (req, res) => {
    try {
        const ok = await Cita.updateEstado(req.params.id, 'Completada');
        if (!ok) return res.status(404).json({ success: false, message: 'Cita no encontrada' });
        res.json({ success: true, message: 'Cita completada' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// Obtener pacientes del médico
router.get('/:id/pacientes', async (req, res) => {
    try {
        const { db } = require('../config/database');
        const [rows] = await db.query(
            `SELECT DISTINCT p.* FROM paciente p
             JOIN citas c ON p.id_paciente = c.id_paciente
             WHERE c.id_medico = ?`,
            [req.params.id]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
//Obtener medico por el id del usuario
router.get('/usuario/:id_usuario', async (req, res) => {
    try {
        const { db } = require('../config/database');
        const [rows] = await db.query(
            'SELECT * FROM personal_medico WHERE id_usuario = ?',
            [req.params.id_usuario]
        );
        if (rows.length === 0) return res.status(404).json({ success: false, message: 'Médico no encontrado' });
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
module.exports = router;