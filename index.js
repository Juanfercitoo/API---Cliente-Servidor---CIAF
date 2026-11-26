const express = require('express');
const turnosRoutes = require('./routes/turnos.routes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static('public'));

app.use('/api/turnos', turnosRoutes);

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El cuerpo de la petición no es un JSON válido' });
  }
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
