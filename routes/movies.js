"use strict";

const express = require("express");

let router = express.Router();

const moviesController = require("../controllers/movies");
const moviesIdController = require("../controllers/moviesId");

//GET /movies - Retorna la llista de pel·lícules
router.get("/", moviesController.getMovies);
//GET /movies/:id - Retorna una pel·lícula en concret
router.get("/:id", moviesIdController.getMovie);

//POST /movies - Afegeix una pel·lícula a la llista
router.post("/", moviesController.postMovie);

//PATCH /movies/:id - Modificar una pel·lícula
router.patch("/:id", moviesIdController.updateMovie);

//DELETE /movies/:id - Eliminar una pel·lícula en concret
router.delete("/:id", moviesIdController.deleteMovie);

module.exports = router;
