// IMPORTAR MODULOS Y VARIABLES
const express = require("express");
const { alumnos } = require("./alumnos");
const { clientes } = require("./clientesTaller");

const PORT = 3001;

// CONFIGURACIÓN DE LA APP
const app = express();

// ENDPOINTS

// ver todos los alumnos
app.get("/alumnos", (req, res) => {
  res.json(alumnos);
});

//ver clientes
app.get("/clientes", (req, res) => {
  res.json(clientes);
});

// ver un alumno por id
app.get("/alumno", (req, res) => {
  if (req.query.id) {
    for (let alumno of alumnos) {
      if (alumno.id == req.query.id) {
        res.json(alumno);
      }
    }
  }
  res.send("no existe ese alumno");
});

// sacar cliente por id
app.get("/cliente", (req, res) => {
  if (req.query.id) {
    for (let cliente of clientes) {
      if (cliente.id == req.query.id) {
        res.json(cliente);
      }
    }
  }
  res.send("no existe ese cliente");
});
//
// ver todos los examenes de una asignatura de un alumno

app.get("/alumno/asignaturas", (req, res) => {
  if (req.query.id) {
    for (let alumno of alumnos) {
      if (alumno.id == req.query.id) {
        res.json(alumno.asignaturas);
      }
    }
  }
  res.send("no existe ese alumno");
});

// ver los coches de un cliente

app.get("/cliente/vehiculos", (req, res) => {
  if (req.query.id) {
    for (let cliente of clientes) {
      if (cliente.id == req.query.id) {
        res.json(cliente.vehiculos);
      }
    }
  }
  res.send("no existe ese cliente");
});

// ver la matricula de uno de los coches de un cliente

app.get("/cliente/vehiculo", (req, res) => {
  const { id, vehiculo } = req.query;

  if (id && vehiculo) {
    const clienteEncontrado = clientes.find((cliente) => cliente.id == id);

    if (clienteEncontrado && clienteEncontrado.vehiculos[vehiculo]) {
      res.json(clienteEncontrado.vehiculos[vehiculo]);
      return;
    }
  }

  res.send("No existe ese cliente o vehículo");
});

// ver los examenes de una asignatura de un alumno
app.get("/alumno/asignatura", (req, res) => {
  const { id, asignatura } = req.query;

  if (id && asignatura) {
    for (let alumno of alumnos) {
      if (alumno.id == id) {
        res.json(alumno.asignaturas[asignatura]);
      }
    }
  }
  res.send("no existe ese alumno o la asignatura");
});

app.get("/alumno/asignatura/trimestre", (req, res) => {
  const { id, asignatura, trimestre } = req.query;

  if (id && asignatura && trimestre) {
    for (let alumno of alumnos) {
      if (alumno.id == id) {
        res.json(alumno.asignaturas[asignatura][trimestre]);
      }
    }
  }
  res.send("no existe ese alumno o la asignatura");
});

app.get("/params", (request, response) => {
  const params = request.params;
  response.send(params);
});

// MANEJO ERRORES

// ARRANCAR LA APP
app.listen(PORT, () => {
  console.log(`La aplicación se ha inicializado en el puerto: ${PORT}`);
});
