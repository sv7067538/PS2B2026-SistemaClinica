const express = require('express');
const router = express.Router();
const {
    solicitarRecuperacion,
    verificarCodigo,
    resetearPassword
} = require('../controllers/passwordController');

router.post('/solicitar', solicitarRecuperacion);
router.post('/verificar', verificarCodigo);
router.post('/resetear', resetearPassword);

module.exports = router;