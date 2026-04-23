const Paciente = require('../models/Paciente');

const pacienteController = {
    // Obtener todos los pacientes
    async getAll(req, res) {
        try {
            const pacientes = await Paciente.getAll();
            res.json({ success: true, data: pacientes, count: pacientes.length });
        } catch (error) {
            console.error('Error en getAll:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Obtener paciente por ID
    async getById(req, res) {
        try {
            const paciente = await Paciente.getById(req.params.id);
            if (!paciente) {
                return res.status(404).json({ success: false, message: 'Paciente no encontrado' });
            }
            res.json({ success: true, data: paciente });
        } catch (error) {
            console.error('Error en getById:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Crear nuevo paciente
    async create(req, res) {
        try {
            // Verificar si ya existe por CI
            const existente = await Paciente.findByCI(req.body.ci);
            if (existente) {
                return res.status(400).json({ success: false, message: 'Ya existe un paciente con ese CI' });
            }

            const id = await Paciente.create(req.body);
            const nuevoPaciente = await Paciente.getById(id);
            res.status(201).json({ success: true, data: nuevoPaciente, message: 'Paciente creado exitosamente' });
        } catch (error) {
            console.error('Error en create:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Actualizar paciente
    async update(req, res) {
        try {
            const updated = await Paciente.update(req.params.id, req.body);
            if (!updated) {
                return res.status(404).json({ success: false, message: 'Paciente no encontrado' });
            }
            const paciente = await Paciente.getById(req.params.id);
            res.json({ success: true, data: paciente, message: 'Paciente actualizado exitosamente' });
        } catch (error) {
            console.error('Error en update:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Eliminar paciente
    async delete(req, res) {
        try {
            const deleted = await Paciente.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Paciente no encontrado' });
            }
            res.json({ success: true, message: 'Paciente eliminado correctamente' });
        } catch (error) {
            console.error('Error en delete:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Buscar por CI
    async findByCI(req, res) {
        try {
            const paciente = await Paciente.findByCI(req.params.ci);
            if (!paciente) {
                return res.status(404).json({ success: false, message: 'Paciente no encontrado' });
            }
            res.json({ success: true, data: paciente });
        } catch (error) {
            console.error('Error en findByCI:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = pacienteController;