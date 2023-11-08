"use strict";

const Movie = require("../models/movies");

//GET /movies - Retorna la llista de pel·lícules
exports.getMovies = async (req, res) => {
  const { genre } = req.query;
  const { fromYear } = req.query;
  const { toYear } = req.query;
  const { rate } = req.query;

  try {
    const movies = await Movie.find({});

    // Per a ordenar per genere
    if (genre) {
      const filteredMovies = movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
      res.json(filteredMovies);
    }

    // Per a obtindre dins d'un interval de anys
    if (fromYear && toYear) {
      //Ordenem l'array per anys de menys a més
      const sortMovies = movies.sort((fY, tY) => {
        return fY.year - tY.year;
      });

      //Filtrem l'array entre les dos dades
      const yearsFitered = sortMovies.filter(
        (sortMovie) => sortMovie.year >= fromYear && sortMovie.year <= toYear
      );

      res.json(yearsFitered);
    }

    // Per a ordenar per Puntuació(rate)
    if (rate) {
      const moviesByRate = movies.sort((f, t) => {
        return f.rate - t.rate;
      });
      res.json(moviesByRate);
    }

    //Llistat de totes les pel·lícules
    res.json(movies);
  } catch (error) {
    res.send(error);
  }
};

// POST /movies - Afegeix una pel·lícula
exports.postMovie = async (req, res) => {
  const { title, year, director, duration, genre, rate } = req.body;

  try {
    const newMovie = await Movie.create({
      title,
      year,
      director,
      duration,
      genre,
      rate,
    });
    res.json(newMovie);
  } catch (error) {
    res.send(error);
  }
};
