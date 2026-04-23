const { db } = require('../config/database');

class Cita {
    static async getAll() {
        try {
            const [rows] = await db.query(`
                SELECT c.*, 
                       p.nombre as paciente_nombre, p.apellido as paciente_apellido,
                       m.nombre as medico_nombre, m.apellido as medico_apellido,
                       e.nombre as especialidad
                FROM citas c
                JOIN paciente p ON c.id_paciente = p.id_paciente
                JOIN personal_medico m ON c.id_medico = m.id_medico
                LEFT JOIN especialidad e ON m.id_especialidad = e.id_especialidad
                ORDER BY c.fecha DESC, c.hora DESC
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getByPaciente(id_paciente) {
        try {
            const [rows] = await db.query(
                `SELECT c.*, m.nombre as medico_nombre, m.apellido as medico_apellido
                 FROM citas c
                 JOIN personal_medico m ON c.id_medico = m.id_medico
                 WHERE c.id_paciente = ?
                 ORDER BY c.fecha DESC`,
                [id_paciente]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async create(citaData) {
        const { id_paciente, id_medico, fecha, hora, estado, motivo } = citaData;
        
        try {
            const [result] = await db.query(
                `INSERT INTO citas 
                 (id_paciente, id_medico, fecha, hora, estado, motivo)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [id_paciente, id_medico, fecha, hora, estado || 'Pendiente', motivo]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async updateEstado(id, estado) {
        try {
            const [result] = await db.query(
                'UPDATE citas SET estado = ? WHERE id_cita = ?',
                [estado, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async getByDate(fecha) {
        try {
            const [rows] = await db.query(
                `SELECT c.*, p.nombre as paciente_nombre, m.nombre as medico_nombre
                 FROM citas c
                 JOIN paciente p ON c.id_paciente = p.id_paciente
                 JOIN personal_medico m ON c.id_medico = m.id_medico
                 WHERE c.fecha = ?
                 ORDER BY c.hora`,
                [fecha]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Cita;