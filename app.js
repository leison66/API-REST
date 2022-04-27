const InitDebug = require("debug")("app:inicio");
const db = require("debug")("app:db");
const express = require("express");
const joi = require("@hapi/joi");
const app = express();
const morgan = require("morgan");
const config = require("config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(",public"));

//consfiguracion
console.log("Aplicacion " + config.get("nombre"));
console.log("DB serve: " + config.get("configDB.host"));



//Uso de midlewerw de tercero
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("morgan habilitado");
  InitDebug("Morgan esta Habilitado");
  db("base de daatos de produccion");
}

const usuarios = [
  { id: 1, nombre: "daniel" },
  { id: 2, nombre: "javier" },
  { id: 3, nombre: "saul" },
];

port = process.env.PORT || 3000;
app.listen(port, () => [console.log("escuchando desde " + port)]);

app.get("/", (req, res) => [res.send(usuarios)]);

app.post("/api/usuarios", (req, res) => {
  const schema = joi.object({
    nombre: joi.string().min(3).required(),
  });
  const { error, value } = schema.validate({ nombre: req.body.nombre });
  if (!error) {
    const usuario = {
      id: usuarios.length + 1,
      nombre: req.body.nombre,
    };
    usuarios.push(usuario);
    res.send(usuario);
  } else {
    res.status(400).send(error.details[0].message);
  }
});

app.put("/api/usuarios/:id", (req, res) => {
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

app.delete("/api/usuarios/:id", (req, res) => {
  let usuario = usuarios.find((u) => u.id === parseInt(req.params.id));
  if (!usuario) {
    res.status(400).send("El usuario no fue encontrado");
    return;
  }
  const index = usuarios.indexOf(usuario);
  usuarios.splice(index, 1);
  res.send(usuarios);
});
