const mongo = require("mongoose");

mongo
  .connect("mongodb://0.0.0.0:27017/demo")
  .then(() => {
    console.log("se ha conectado a la base de mongo");
  })
  .catch((err) => {
    console.log("no se ha conectado a la base por el error " + err);
  });

const esquema = new mongo.Schema({
  nombre: String,
  autor: String,
  etiquetas: [String],
  fecha: { type: Date, default: Date.now },
  publicado: Boolean,
});

const Curso = mongo.model("Curso", esquema);

async function newIncert() {
  const curso = new Curso({
    nombre: "Jime",
    autor: "bryan",
    etiquetas: ["dos", "tres"],
    publicado: false,
  });

  await curso
    .save()
    .then((res) => {
      console.log("se ha realizado la insercion del documento: " + res);
    })
    .catch((err) => {
      console.log("error " + err);
    });
}

// newIncert();
async function Listar() {
  await Curso.find({etiquetas:'tres'})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
// Listar();

