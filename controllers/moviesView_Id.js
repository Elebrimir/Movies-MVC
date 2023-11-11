"use strict";

const Movie = require("../models/movies");

//GET /movies/:id - Retorna la pel·lícula indicada per id
exports.getMovie = async (req, res) => {
  const { id } = req.params;

  try {
    let movie = await Movie.findById(id);

    return res.render("movies/llistar", { movie });
  } catch (error) {
    res.render("error", { error });
  }
};

//GET /movies/update/:id - Mostrar formulari per actualitzar peli
exports.updateMovieView = async (req, res) => {
  const { id } = req.params;

  try {
    let movie = await Movie.findById(id);
    return res.render("movies/update", { movie });
  } catch (error) {
    res.render("error", { error });
  }
};

//POST /movies/update/:id - Actualitza la pel·lícula indicada per id
exports.updateMovie = async (req, res) => {
  const { id } = req.params;

  try {
    let movie = await Movie.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new:true,
    });
    return res.redirect("/movies");
  } catch (error) {
    const movie = new Movie(req.body) // Creem un nou objecte Movie amb les dades antigues del formulari
    // Si hi ha errors de validació, tornem a renderitzar el formulari amb els errors i les dades antigues
    res.render("movies/update", { movie, errors: error.errors });
  }
};

//POST /movies/:id - Elimina una pel·lícula indicada per id
exports.deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    console.log(deletedMovie);
    return res.redirect("/movies");
  } catch (error) {
    res.render("error", { error });
  }
};
