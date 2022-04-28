const InitDebug = require("debug")("app:inicio");
const db = require("debug")("app:db");
const express = require("express");
const app = express();
const morgan = require("morgan");
const config = require("config");
const user = require('./routes/usuarios')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(",public"));
app.use('/api/usuarios',user);

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



port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("escuchando desde " + port);
});
