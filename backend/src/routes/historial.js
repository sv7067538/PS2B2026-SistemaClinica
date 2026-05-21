const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

// Obtener historial por paciente
router.get('/paciente/:id_paciente', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT h.*, m.nombre as medico_nombre, m.apellido as medico_apellido
             FROM historial_clinico h
             JOIN personal_medico m ON h.id_medico = m.id_medico
             WHERE h.id_paciente = ?
             ORDER BY h.fecha DESC`,
            [req.params.id_paciente]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Crear historial
router.post('/', async (req, res) => {
    try {
        const { id_paciente, id_medico, diagnostico, tratamiento, observaciones, motivo_consulta } = req.body;
        const [result] = await db.query(
            `INSERT INTO historial_clinico (id_paciente, id_medico, fecha, diagnostico, tratamiento, observaciones, motivo_consulta)
             VALUES (?, ?, NOW(), ?, ?, ?, ?)`,
            [id_paciente, id_medico, diagnostico, tratamiento, observaciones, motivo_consulta]
        );
        res.json({ success: true, id_historial: result.insertId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;