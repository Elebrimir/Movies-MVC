"use strict";

const express = require("express");
const mongoose = require("mongoose");
const moviesRouter = require("./routes/movies");

const app = express();
const port = 8080;

mongoose.connect("mongodb://127.0.0.1:27017/movies");

app.use(express.json());

app.use("/movies", moviesRouter);

app.get("/", (req, res) => res.send("Hola Món!"));
app.listen(port, () => console.log(`App escoltant en port ${port}!`));
