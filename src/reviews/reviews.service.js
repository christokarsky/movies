// reviews.service.js

const knex = require("../db/connection");

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

function read(reviewId) {
  return knex("reviews").select("*").where({ "review_id": reviewId }).first();
}

function update(review) {
  return knex("reviews")
    .where({ "review_id": review.review_id })
    .update(review,"*")
    .then(()=>read(review.review_id))
    .then(setCritic)
}

async function setCritic(review){
  review.critic = await readCritic(review.critic_id);
    return review;
}

async function readCritic(critic_id){
  return knex("critics")
    .where({critic_id})
    .first()
}



module.exports = {
  delete: destroy,
  read,
  update,
};
