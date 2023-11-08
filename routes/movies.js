"use strict";

const express = require("express");

let router = express.Router();

const moviesController = require("../controllers/movies");

//GET /movies - Retorna la llista de pel·lícules
router.get("/", moviesController.getMovies);

//POST /movies - Afegeix una pel·lícula a la llista
router.post("/", moviesController.postMovie);

module.exports = router;
