"use strict";

const mongoose = require("mongoose");
const Movies = require("../models/movies");

mongoose.connect("mongodb://127.0.0.1:27017/movies");

Movies.find()
  .then((res) => {
    console.log(
      "Connexió ok, ",
      `${res.length} elements a la base de dades 'movies'`
    );
  })
  .catch((error) => {
    console.log("Error en la connexió", error);
  });
