# API REST – Reservas de Cancha Sintética

Taller final – Arquitectura cliente/servidor (CIAF)
API REST hecha con **Node.js + Express** para gestionar las reservas de turnos de una cancha sintética.

---

##  Integrantes 

| _11_ | _Diego Fernando Montiel_ |
| _13_ | _Juan Fernando Noreña_ |


##  Descripción del negocio

**Cancha Sintética** alquila canchas de fútbol 5 y fútbol 8 por horas para grupos de amigos, empresas y torneos de barrio.

Cada reserva (turno) necesita:

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `responsable` | texto | Sí | Persona que hace la reserva |
| `telefono` | texto | Sí | Teléfono de contacto |
| `tipoCancha` | texto | Sí | `futbol 5` o `futbol 8` |
| `fechaHora` | texto (fecha) | Sí | Fecha y hora del partido, ej. `2026-12-05T19:00` |
| `duracionHoras` | número > 0 | Sí | Horas reservadas |
| `precioBase` | número > 0 | Sí | Valor del alquiler sin recargo |
| `prioritario` | booleano | No | `true` = reserva en **horario pico** (noches y fines de semana), con recargo |

---

##  Arquitectura por capas

```
api-cancha-sintetica/
├── index.js                        # Inicia Express, middlewares, rutas y servidor
├── routes/turnos.routes.js         # Solo define los endpoints
├── controllers/turnos.controller.js # Recibe req/res, valida y asigna códigos HTTP
├── services/turnos.service.js      # Lógica de negocio, cálculo de tarifa y datos en memoria
├── public/                         # Frontend básico (cliente)
│   ├── index.html                  # Formulario, búsqueda y tabla de turnos
│   ├── styles.css
│   └── app.js                      # Consume la API con fetch()
├── package.json
└── .gitignore
```

Flujo de una petición: **Cliente → routes → controller → service → controller → respuesta JSON**

Los datos se guardan en un **arreglo en memoria** (se borran al reiniciar el servidor).



##  Endpoints

| Método | Ruta | Descripción | Códigos |
|---|---|---|---|
| GET | `/api/turnos` | Lista todos los turnos | 200 |
| GET | `/api/turnos/:id` | Busca un turno por id | 200, 404 |
| POST | `/api/turnos` | Crea un turno y calcula `totalPagar` | 201, 400 |

