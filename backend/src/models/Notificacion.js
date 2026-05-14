const { db } = require('../config/database');

class Notificacion {
    static async getByUsuario(id_usuario) {
        const [rows] = await db.query(
            `SELECT * FROM notificaciones 
             WHERE id_usuario = ? 
             ORDER BY fecha DESC`,
            [id_usuario]
        );
        return rows;
    }

    static async create(id_usuario, titulo, mensaje) {
        const [result] = await db.query(
            `INSERT INTO notificaciones (id_usuario, titulo, mensaje, fecha, leido) 
             VALUES (?, ?, ?, NOW(), 0)`,
            [id_usuario, titulo, mensaje]
        );
        return result.insertId;
    }

    static async marcarLeido(id_notificacion) {
        const [result] = await db.query(
            'UPDATE notificaciones SET leido = 1 WHERE id_notificacion = ?',
            [id_notificacion]
        );
        return result.affectedRows > 0;
    }

    static async marcarTodasLeidas(id_usuario) {
        await db.query(
            'UPDATE notificaciones SET leido = 1 WHERE id_usuario = ?',
            [id_usuario]
        );
    }

    static async contarNoLeidas(id_usuario) {
        const [rows] = await db.query(
            'SELECT COUNT(*) as total FROM notificaciones WHERE id_usuario = ? AND leido = 0',
            [id_usuario]
        );
        return rows[0].total;
    }
}

module.exports = Notificacion;