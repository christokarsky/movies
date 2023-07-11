const knex = require("../db/connection");

async function listTheatersAndMovies() {
  const theaters = await knex("theaters").select("*");
  const theaterMovies = [];

  for (let i = 0; i < theaters.length; i++) {
    const theater = theaters[i];
    const movies = await knex("movies")
      .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
      .where({"movies_theaters.theater_id": theater.theater_id})
      .select("movies.*");
    
    theaterMovies.push({ ...theater, movies });
  }

  return theaterMovies;
}

module.exports = {
  listTheatersAndMovies,
};