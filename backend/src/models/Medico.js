const { db } = require('../config/database');

class Medico {
    static async getAll() {
        try {
            const [rows] = await db.query(`
                SELECT m.*, e.nombre as especialidad_nombre, c.nombre as clinica_nombre
                FROM personal_medico m
                LEFT JOIN especialidad e ON m.id_especialidad = e.id_especialidad
                LEFT JOIN clinica c ON m.id_clinica = c.id_clinica
                ORDER BY m.apellido
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await db.query(
                `SELECT m.*, e.nombre as especialidad_nombre 
                 FROM personal_medico m
                 LEFT JOIN especialidad e ON m.id_especialidad = e.id_especialidad
                 WHERE m.id_medico = ?`,
                [id]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async getHorarios(id_medico) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM horarios WHERE id_medico = ? AND activo = 1 ORDER BY FIELD(dia, "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado")',
                [id_medico]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Medico;