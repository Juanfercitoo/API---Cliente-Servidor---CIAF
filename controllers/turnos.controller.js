const turnosService = require('../services/turnos.service');

const TIPOS_CANCHA = ['futbol 5', 'futbol 8'];

const listarTurnos = (req, res) => {
  const turnos = turnosService.obtenerTodos();
  res.status(200).json(turnos);
};

const obtenerTurno = (req, res) => {
  const id = Number(req.params.id);
  const turno = turnosService.obtenerPorId(id);

  if (!turno) {
    return res.status(404).json({ error: `No existe un turno con id ${req.params.id}` });
  }

  res.status(200).json(turno);
};

const crearTurno = (req, res) => {
  const { responsable, telefono, tipoCancha, fechaHora, duracionHoras, precioBase, prioritario } = req.body || {};

  const faltantes = [];
  if (!responsable) faltantes.push('responsable');
  if (!telefono) faltantes.push('telefono');
  if (!tipoCancha) faltantes.push('tipoCancha');
  if (!fechaHora) faltantes.push('fechaHora');
  if (duracionHoras === undefined) faltantes.push('duracionHoras');
  if (precioBase === undefined) faltantes.push('precioBase');

  if (faltantes.length > 0) {
    return res.status(400).json({ error: 'Faltan campos obligatorios', campos: faltantes });
  }

  if (typeof duracionHoras !== 'number' || duracionHoras <= 0) {
    return res.status(400).json({ error: 'duracionHoras debe ser un número mayor que cero' });
  }
  if (typeof precioBase !== 'number' || precioBase <= 0) {
    return res.status(400).json({ error: 'precioBase debe ser un número mayor que cero' });
  }

  if (!TIPOS_CANCHA.includes(String(tipoCancha).toLowerCase())) {
    return res.status(400).json({ error: `tipoCancha debe ser uno de: ${TIPOS_CANCHA.join(', ')}` });
  }
  if (isNaN(Date.parse(fechaHora))) {
    return res.status(400).json({ error: 'fechaHora no es una fecha válida (ejemplo: 2026-12-05T19:00)' });
  }
  if (prioritario !== undefined && typeof prioritario !== 'boolean') {
    return res.status(400).json({ error: 'prioritario debe ser true o false' });
  }

  const nuevoTurno = turnosService.crear({
    responsable,
    telefono,
    tipoCancha: String(tipoCancha).toLowerCase(),
    fechaHora,
    duracionHoras,
    precioBase,
    prioritario
  });

  res.status(201).json(nuevoTurno);
};

module.exports = { listarTurnos, obtenerTurno, crearTurno };
