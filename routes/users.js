"use strict";

const express = require("express");

let router = express.Router();

const userController = require("../controllers/users");

//Controladors Usuaris

//POST /api/v1/movies/login - Fer login usuari
router.post("/login", userController.loginUser);

//POST /api/v1/movies/register - Registrar nou usuari
router.post("/register", userController.registerUser);

module.exports = router;
