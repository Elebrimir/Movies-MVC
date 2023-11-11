"use strict";

const Movie = require("../models/movies");

//GET /api/v1/movies/:id - Retorna la pel·lícula indicada per id
exports.getMovie = async (req, res) => {
  const { id } = req.params;

  try {
    let movie = await Movie.findById(id);

    if (!movie) {
      return res
        .status(404)
        .send(`No s'ha trobat cap pel·lícula amb l'ID ${id}`);
    }

    return res.json(movie);
  } catch (error) {
    res.status(404).send(error);
  }
};

//PATCH /api/v1/movies/update/:id - Actualitza la pel·lícula per el id
exports.updateMovie = async (req, res) => {
  const { id } = req.params;

  try {
    let movie = await Movie.findByIdAndUpdate(id, req.body);
    if (!movie) {
      return res
        .status(404)
        .send(`No s'ha trobat cap pel·lícula amb l'ID ${id}`);
    }

    return res.json({
      message: "La pel·lícula ha estat actualitzada correctament",
      movie,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

//DELETE /api/v1/movies/delete/:id - Elimina una pel·lícula per el id
exports.deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    let movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res
        .status(404)
        .send(`No s'ha trobat cap pel·lícula amb l'ID ${id}`);
    }
    return res.json({
      message: `S'ha eliminat la pel·lícula: ${movie.title}`,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};