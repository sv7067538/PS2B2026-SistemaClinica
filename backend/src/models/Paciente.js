const { db } = require('../config/database');

class Paciente {
    static async getAll() {
        try {
            const [rows] = await db.query(`
                SELECT id_paciente, nombre, apellido, ci, telefono, 
                       direccion, email, genero, fecha_nacimiento, 
                       tipo_sangre, alergias, fecha_registro
                FROM paciente
                ORDER BY apellido, nombre
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM paciente WHERE id_paciente = ?',
                [id]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(pacienteData) {
        const {
            nombre, apellido, ci, telefono, direccion,
            email, genero, fecha_nacimiento, tipo_sangre,
            alergias, id_usuario = null
        } = pacienteData;

        try {
            const [result] = await db.query(
                `INSERT INTO paciente 
                (nombre, apellido, ci, telefono, direccion, email, 
                 genero, fecha_nacimiento, tipo_sangre, alergias, id_usuario)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [nombre, apellido, ci, telefono, direccion, email,
                 genero, fecha_nacimiento, tipo_sangre, alergias, id_usuario]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, pacienteData) {
        const {
            nombre, apellido, ci, telefono, direccion,
            email, genero, fecha_nacimiento, tipo_sangre, alergias
        } = pacienteData;

        try {
            const [result] = await db.query(
                `UPDATE paciente 
                SET nombre = ?, apellido = ?, ci = ?, telefono = ?, 
                    direccion = ?, email = ?, genero = ?, 
                    fecha_nacimiento = ?, tipo_sangre = ?, alergias = ?
                WHERE id_paciente = ?`,
                [nombre, apellido, ci, telefono, direccion, email,
                 genero, fecha_nacimiento, tipo_sangre, alergias, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query(
                'DELETE FROM paciente WHERE id_paciente = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async findByCI(ci) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM paciente WHERE ci = ?',
                [ci]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Paciente;