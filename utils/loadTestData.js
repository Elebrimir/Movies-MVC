"use strict";

const mongoose = require("mongoose");

// Connexió a MongoDB

mongoose
  .connect("mongodb://127.0.0.1:27017/movies")
  .then(() => {
    console.log("Conectat a MongoDB");
  })
  .catch((error) => {
    console.log("Error al connectar a MongoDB ", error);
  });

// Model de Movie
const Movie = require("../models/movies.js");
// Model de Role
const Role = require("../models/roles.js");

//Dades de Prova
const movies = require("../json/movies.json");
const role = require("../json/role.json");

//Inserir dades a la base de dades a partir del fitxer JSON
Movie.insertMany(movies)
  .then(() => {
    console.log("Dades Movies Insertades");
  })
  .catch((error) => {
    console.log("Error al inserir les dades Movies", error);
  });

Role.insertMany(role)
  .then(() => {
    console.log("Dades Role Insertades");
  })
  .catch((error) => {
    console.log("Error al inserir les dades Role ", error);
  });
