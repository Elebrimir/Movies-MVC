"use strict";

const express = require("express");
const mongoose = require("mongoose");
const nunjucks = require("nunjucks");
const cors = require("cors");
const path = require('path');


const moviesRouterView = require("./routes/moviesView");
const moviesRouterAPI = require("./routes/moviesAPI");

const app = express();
const port = 8080;

mongoose.connect("mongodb://127.0.0.1:27017/movies");

nunjucks.configure("views", { autoescape: true, express: app });

app.set("view engine", "njk");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/movies", moviesRouterView);
app.use("/api/v1/movies", moviesRouterAPI);

app.get("/", (req, res) => {
    // Ruta al archivo web que quieres enviar
    const filePath = path.join(__dirname, './views/home.njk');

    // Enviar el archivo como respuesta
    res.render(filePath);
  });
app.listen(port, () => console.log(`App escoltant en port ${port}!`));