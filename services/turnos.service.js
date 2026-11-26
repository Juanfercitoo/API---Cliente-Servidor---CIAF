const N = 11;
const PORCENTAJE_RECARGO = N * 2; 

const turnos = [];
let siguienteId = 1;

const obtenerTodos = () => turnos;

const obtenerPorId = (id) => turnos.find((turno) => turno.id === id);

const calcularTotal = (precioBase, prioritario) => {
  if (prioritario === true) {
    return precioBase + (precioBase * PORCENTAJE_RECARGO) / 100;
  }
  return precioBase;
};

const crear = (datos) => {
  const prioritario = datos.prioritario === true;

  const nuevoTurno = {
    id: siguienteId++,
    responsable: datos.responsable,
    telefono: datos.telefono,
    tipoCancha: datos.tipoCancha,
    fechaHora: datos.fechaHora,
    duracionHoras: datos.duracionHoras,
    precioBase: datos.precioBase,
    prioritario,
    porcentajeRecargo: prioritario ? PORCENTAJE_RECARGO : 0,
    totalPagar: calcularTotal(datos.precioBase, prioritario)
  };

  turnos.push(nuevoTurno);
  return nuevoTurno;
};

module.exports = { obtenerTodos, obtenerPorId, crear };
