const express = require('express');
const turnosController = require('../controllers/turnos.controller');

const router = express.Router();

router.get('/', turnosController.listarTurnos);
router.get('/:id', turnosController.obtenerTurno);
router.post('/', turnosController.crearTurno);

module.exports = router;
