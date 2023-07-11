const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function listShowingMovies() {
  return knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .select("movies.*")
    .where("movies_theaters.is_showing", true)
    .groupBy("movies.movie_id");
}

function read(movieId) {
  return knex("movies").select("*").where({ "movie_id": movieId }).first();
}

function moviePlayingAt(movieId) {
  return knex("movies_theaters")
    .join("theaters", "movies_theaters.theater_id", "theaters.theater_id")
    .where({ "movies_theaters.movie_id": movieId })
    .select("theaters.*");
}

function listReviews(movieId) {
    return knex("reviews")
    .select("*")
    .where({ "movie_id": movieId });
}

async function getCritic(criticId) {
    return knex("critics")
      .select("*")
      .where({ critic_id: criticId })
      .first();
  }
  
  

module.exports = {
  moviePlayingAt,
  list,
  listShowingMovies,
  read,
  listReviews,
  getCritic,
};
