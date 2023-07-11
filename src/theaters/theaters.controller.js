const service = require("./theaters.service");

async function list(req, res) {
  const theaters = await service.listTheatersAndMovies();
  res.json({ data: theaters });
}

module.exports = {
  list,
};