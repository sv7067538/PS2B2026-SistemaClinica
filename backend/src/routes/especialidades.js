const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM especialidad ORDER BY nombre');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;