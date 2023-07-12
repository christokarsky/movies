const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.route("/").get(cors(),controller.list).all(methodNotAllowed);
router.route("/:movieId").get(cors(),controller.read).all(methodNotAllowed);
router.route("/:movieId/theaters").get(cors(),controller.movieTheaters).all(methodNotAllowed);
router.route("/:movieId/reviews").get(cors(),controller.listReviews).all(methodNotAllowed)

module.exports = router;
