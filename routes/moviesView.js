"use strict";

const express = require("express");

let router = express.Router();

const moviesController = require("../controllers/moviesView");
const moviesIdController = require("../controllers/moviesViewId");

//GET /movies/llistar - Retorna la llista de pel·lícules
router.get("/", moviesController.getMovies);

//GET /movies/:id - Retorna una pel·lícula en concret
router.get("/:id", moviesIdController.getMovie);

//POST /movies - Afegeix una pel·lícula a la llista
router.post("/inserir", moviesController.postMovie);

//PATCH /movies/:id - Modificar una pel·lícula
router.patch("/:id", moviesIdController.updateMovie);

//DELETE /movies/:id - Eliminar una pel·lícula en concret
router.delete("/:id", moviesIdController.deleteMovie);

module.exports = router;
