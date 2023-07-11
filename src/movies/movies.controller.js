const service = require("./movies.service");

async function list(req, res) {
  if (req.query.is_showing) {
    res.send({ data: await service.listShowingMovies() });
  } else {
    res.send({ data: await service.list() });
  }
}

async function listShowingMovies(req, res, next) {
  const data = await service.listShowingMovies();
  console.log(data);
  res.json({ data });
}

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: "Movie cannot be found" });
}

async function read(req, res, next) {
  const { movie } = res.locals;
  res.json({ data: movie });
}

async function movieTheaters(req, res, next) {
  const { movieId } = req.params;
  const theaters = await service.moviePlayingAt(movieId);
  res.json({ data: theaters });
}

async function listReviews(req, res, next) {
    const { movieId } = req.params;
    const reviews = await service.listReviews(movieId);
  
    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];
      const critic = await service.getCritic(review.critic_id);
      review.critic = critic;
    }
  
    res.json({ data: reviews });
  }
  
  

module.exports = {
  list,
  listShowingMovies,
  read: [movieExists, read],
  movieTheaters,
  listReviews,
};
