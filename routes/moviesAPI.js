"use strict";

const express = require("express");

//Middelwares
const verifyToken = require("../middlewares/validate-tokens");
const isAdmin = require("../middlewares/isAdmin");
const isSuperuser = require("../middlewares/isSuperuser");
const isUser = require("../middlewares/isUser");
const isGuest = require("../middlewares/isGuest");

let router = express.Router();

const moviesController = require("../controllers/moviesAPI");
const moviesIdController = require("../controllers/moviesAPI_Id");

// Controlador base

//GET /api/v1/movies/ - Retorna la llista de pel·lícules
router.get("/", moviesController.getMovies);

//POST /api/v1/movies/create - Afegeix una pel·lícula a la llista
router.post(
  "/create",
  verifyToken,
  isAdmin,
  isSuperuser,
  isUser,
  moviesController.postMovie
);

// Controlador que li passem el parametre _id al endpoint

//GET /api/v1/movies/:id - Retorna una pel·lícula en concret
router.get("/:id", moviesIdController.getMovie);

//PATCH /api/v1/movies/update/:id - Modificar una pel·lícula
router.patch(
  "/update/:id",
  verifyToken,
  isAdmin,
  isSuperuser,
  moviesIdController.updateMovie
);

//DELETE /api/v1/movies/delete/:id - Eliminar una pel·lícula en concret
router.delete(
  "/delete/:id",
  verifyToken,
  isAdmin,
  moviesIdController.deleteMovie
);

module.exports = router;
