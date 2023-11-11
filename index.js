"use strict";

const express = require("express");
const mongoose = require("mongoose");
const nunjucks = require("nunjucks");

const moviesRouterView = require("./routes/moviesView");
const moviesRouterAPI = require("./routes/movies");

const app = express();
const port = 8080;

mongoose.connect("mongodb://127.0.0.1:27017/movies");

nunjucks.configure("views", { autoescape: true, express: app });

app.set("view engine", "njk");

app.use(express.json());
app.use("/movies", moviesRouterView);
app.use("/api/movies", moviesRouterAPI);

app.get("/", (req, res) => res.send("Hola Món!"));
app.listen(port, () => console.log(`App escoltant en port ${port}!`));