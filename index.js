"use strict";

const express = require("express");
const mongoose = require("mongoose");
const nunjucks = require("nunjucks");
const cors = require("cors");

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

app.get("/", (req, res) => res.send("Hola Món!"));
app.listen(port, () => console.log(`App escoltant en port ${port}!`));
