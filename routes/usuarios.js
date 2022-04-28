const express = require("express");
const rutas = express.Router();
const joi = require("@hapi/joi");

const usuarios = [
  { id: 1, nombre: "daniel" },
  { id: 2, nombre: "javier" },
  { id: 3, nombre: "saul" },
];

rutas.get("/", (req, res) => {
  res.send(usuarios);
});

rutas.post("/", (req, res) => {
  const schema = joi.object({
    nombre: joi.string().min(3).required(),
  });
  const { error, value } = schema.validate({ nombre: req.body.nombre });
  if (!error) {
    const usuario = {
      id: usuarios.length + 1,
      nombre: value,
    };
    usuarios.push(usuario);
    res.send(usuario);
  } else {
    res.status(400).send(error.details[0].message);
  }
});

rutas.put("/:id", (req, res) => {
  let usuario = usuarios.find((u) => u.id === parseInt(req.params.id));
  if (!usuario) {
    res.status(400).send("El usuario no fue encontrado");
    return;
  }
  const schema = joi.object({
    nombre: joi.string().min(3).required(),
  });
  const { error, value } = schema.validate({ nombre: req.body.nombre });
  console.log(value.nombre);
  if (!error) {
    usuario.nombre = value.nombre;
    res.send(usuario);
  } else {
    res.status(400).send(error.details[0].message);
  }
});

rutas.delete("/:id", (req, res) => {
  let usuario = usuarios.find((u) => u.id === parseInt(req.params.id));
  if (!usuario) {
    res.status(400).send("El usuario no fue encontrado");
    return;
  }
  const index = usuarios.indexOf(usuario);
  usuarios.splice(index, 1);
  res.send(usuarios);
});

module.exports = rutas;
