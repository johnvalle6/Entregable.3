const express = require("express");
const router = express.Router();

// Models
const Task = require("../models/reserva");
const Disponible = "../models/disponibilidad";

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New reserva
router.get("/reserve/add", isAuthenticated, (req, res) => {
  res.render("reserve/new-reserve");
});

router.post("/reserve/new-reserve", isAuthenticated, async (req, res) => {
  const {
    Nombre,
    Apellido,
    tipodocumento,
    Cedula,
    Telefono,
    habitacion,
    personas,
    ingreso,
    salida
  } = req.body;
  const errors = [];
  if (!Nombre) {
    errors.push({ text: "Please Write a Title." });
  }
  if (!Apellido) {
    errors.push({ text: "Please Write a Apellido" });
  }
  if (!tipodocumento) {
    errors.push({ text: "Please Write a tipodocumento" });
  }
  if (!Cedula) {
    errors.push({ text: "Please Write a Cedula" });
  }
  if (!Telefono) {
    errors.push({ text: "Please Write a Telefono" });
  }
  if (!habitacion) {
    errors.push({ text: "Please Write a habitacion" });
  }
  if (!personas) {
    errors.push({ text: "Please Write a personas" });
  }
  if (!ingreso) {
    errors.push({ text: "Please Write a ingreso" });
  }
  if (!salida) {
    errors.push({ text: "Please Write a salida" });
  }
  if (errors.length > 0) {
    res.render("reserve/new-reserve", {
      errors,
      Nombre,
      Apellido,
      tipodocumento,
      Cedula,
      Telefono,
      habitacion,
      personas,
      ingreso,
      salida
    });
  } else {
    const newTask = new Task({
      Nombre,
      Apellido,
      tipodocumento,
      Cedula,
      Telefono,
      habitacion,
      personas,
      ingreso,
      salida
    });
    newTask.user = req.user.id;
    await newTask.save();
    req.flash("success_msg", "Reserva aceptada");
    res.redirect("/reserve");
  }
});

// Get All Notes
router.get("/reserve", isAuthenticated, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort({ date: "desc" });
  res.render("reserve/all-notes", { tasks });
});

// Edit Notes
router.get("/reserve/edit/:id", isAuthenticated, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/reserve");
  }
  res.render("reserve/edit-note", { task });
});

router.put("/reserve/edit-note/:id", isAuthenticated, async (req, res) => {
  const {
    Nombre,
    Apellido,
    tipodocumento,
    Cedula,
    Telefono,
    habitacion,
    personas,
    ingreso,
    salida
  } = req.body;
  await Task.findByIdAndUpdate(req.params.id, {
    Nombre,
    Apellido,
    tipodocumento,
    Cedula,
    Telefono,
    habitacion,
    personas,
    ingreso,
    salida
  });
  req.flash("success_msg", "Reserve acept");
  res.redirect("/reserve");
});

// Delete Notes
router.delete("/reserve/delete/:id", isAuthenticated, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Reserve Deleted Successfully");
  res.redirect("/reserve");
});

module.exports = router;
