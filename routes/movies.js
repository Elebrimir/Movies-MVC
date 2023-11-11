"use strict";

const express = require("express");

let router = express.Router();

const moviesController = require("../controllers/movies");
const moviesIdController = require("../controllers/moviesId");

//GET /api/movies - Retorna la llista de pel·lícules
router.get("/", moviesController.getMovies);

//GET /api/movies/:id - Retorna una pel·lícula en concret
router.get("/:id", moviesIdController.getMovie);

//POST /api/movies - Afegeix una pel·lícula a la llista
router.post("/", moviesController.postMovie);

//PATCH /api/movies/:id - Modificar una pel·lícula
router.patch("/:id", moviesIdController.updateMovie);

//DELETE /api/movies/:id - Eliminar una pel·lícula en concret
router.delete("/:id", moviesIdController.deleteMovie);

module.exports = router;
