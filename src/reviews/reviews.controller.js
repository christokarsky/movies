const service = require("./reviews.service");

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;

    const review = await service.read(reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    return next({ status: 404, message: "Review cannot be found." })
}

async function destroy(req, res) {
    const { review } = res.locals;
    await service.delete(review.review_id);
    res.sendStatus(204);
}

async function update(req, res) {
    const { review } = res.locals;
    const updatedReview = {
        ...req.body.data,
        review_id: req.params.reviewId
    };
    const data = await service.update(updatedReview);
    res.json({data});
    };
  

module.exports = {
    delete: [reviewExists, destroy],
    update: [reviewExists, update],
}