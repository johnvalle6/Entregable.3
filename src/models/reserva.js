const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskShema = new Schema({
  Nombre: String,
  Apellido: String,
  tipodocumento: String,
  Cedula: String,
  Telefono: String,
  habitacion: String,
  personas: Number,
  ingreso: String,
  salida: String,

  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("tasks", TaskShema);
