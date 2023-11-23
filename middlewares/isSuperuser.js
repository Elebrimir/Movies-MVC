"use strict";

const Role = require("../models/roles");

async function isSuperuser(req, res, next) {
  try {
    const superUserRole = await Role.findOne({ roleName: "Superuser" });

    if (!superUserRole) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }

    // Comparar la ID del rol 'SuperUser' amb el valor del camp 'role' de l'usuari

    if (req.user && req.user.role.toString() === superUserRole._id.toString()) {
      return next(); // Permitir acces
    } else {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = isSuperuser;
