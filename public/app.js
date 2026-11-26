const API = '/api/turnos';

const formatoPesos = (valor) => '$' + Number(valor).toLocaleString('es-CO');

async function cargarTurnos() {
  const respuesta = await fetch(API);
  const turnos = await respuesta.json();

  const tabla = document.getElementById('tablaTurnos');
  tabla.innerHTML = '';

  if (turnos.length === 0) {
    tabla.innerHTML = '<tr><td colspan="8">No hay turnos registrados</td></tr>';
    return;
  }

  turnos.forEach((t) => {
    const fila = document.createElement('tr');
    [
      t.id,
      t.responsable,
      t.tipoCancha,
      t.fechaHora.replace('T', ' '),
      t.duracionHoras,
      formatoPesos(t.precioBase),
      t.prioritario ? 'Sí' : 'No',
      formatoPesos(t.totalPagar)
    ].forEach((valor) => {
      const celda = document.createElement('td');
      celda.textContent = valor;
      fila.appendChild(celda);
    });
    tabla.appendChild(fila);
  });
}

function mostrarMensaje(id, texto, tipo) {
  const div = document.getElementById(id);
  div.className = tipo;
  div.textContent = texto;
}

const numero = (id) => {
  const valor = document.getElementById(id).value;
  return valor === '' ? undefined : Number(valor);
};

document.getElementById('formTurno').addEventListener('submit', async (e) => {
  e.preventDefault();

  const datos = {
    responsable: document.getElementById('responsable').value,
    telefono: document.getElementById('telefono').value,
    tipoCancha: document.getElementById('tipoCancha').value,
    fechaHora: document.getElementById('fechaHora').value,
    duracionHoras: numero('duracionHoras'),
    precioBase: numero('precioBase'),
    prioritario: document.getElementById('prioritario').checked
  };

  const respuesta = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  const resultado = await respuesta.json();

  if (respuesta.status === 201) {
    mostrarMensaje(
      'mensaje',
      ` (201) Turno #${resultado.id} creado. Total a pagar: ${formatoPesos(resultado.totalPagar)}`,
      'exito'
    );
    e.target.reset();
    cargarTurnos();
  } else {
    const campos = resultado.campos ? ': ' + resultado.campos.join(', ') : '';
    mostrarMensaje('mensaje', ` (${respuesta.status}) ${resultado.error}${campos}`, 'error');
  }
});

document.getElementById('btnBuscar').addEventListener('click', async () => {
  const id = document.getElementById('buscarId').value;
  if (!id) return;

  const respuesta = await fetch(`${API}/${id}`);
  const resultado = await respuesta.json();

  if (respuesta.status === 200) {
    mostrarMensaje(
      'resultadoBusqueda',
      ` (200) ${resultado.responsable} – ${resultado.tipoCancha} – ${resultado.fechaHora.replace('T', ' ')} – Total: ${formatoPesos(resultado.totalPagar)}`,
      'exito'
    );
  } else {
    mostrarMensaje('resultadoBusqueda', ` (${respuesta.status}) ${resultado.error}`, 'error');
  }
});

cargarTurnos();
