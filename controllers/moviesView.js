"use strict";

const Movie = require("../models/movies");
const crypto = require("crypto");

//GET /movies - Retorna la llista de pel·lícules
exports.getMovies = async (req, res) => {
  const { genre } = req.query;
  const { fromYear } = req.query;
  const { toYear } = req.query;
  const { rate } = req.query;

  try {
    const movies = await Movie.find({});
    let movieS = movies

    // Per a ordenar per genere
    if (genre) {
      let movieS = movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
      return res.render("movies/llistar", { movieS });
    }

    // Per a obtindre dins d'un interval de anys
    if (fromYear && toYear) {
      //Ordenem per anys de menys a més
      const sortMovies = movies.sort((a, b) => a.year - b.year);

      //Filtrem l'array entre les dos dades
      let movieS = sortMovies.filter(
        (sortMovie) => sortMovie.year >= fromYear && sortMovie.year <= toYear
      );

      return res.render("movies/llistar", { movieS });
    }

    // Per a ordenar per Puntuació(rate)
    if (rate) {
      //Ordenem per rate amb sort de major a menor
      let movieS = movies.sort((a, b) => b.rate - a.rate);
      return res.render("movies/llistar", { movieS });
    }

    //Llistat de totes les pel·lícules
    return res.render("movies/llistar", { movieS });
  } catch (error) {
    res.send(error);
  }
};

// POST /movies - Afegeix una pel·lícula
exports.postMovie = async (req, res) => {
  if (!req.body || !req.body.title) {
    return res.status(400).json({ error: "Falten dades en la sol·licitud" });
  }

  const { title, year, director, duration, genre, rate } = req.body;
  const id = crypto.randomUUID();

  try {
    const newMovie = await Movie.create({
      id,
      title,
      year,
      director,
      duration,
      genre,
      rate,
    });
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ error: "Ha hagut un error al crear la pel·lícula" });
  }
};
