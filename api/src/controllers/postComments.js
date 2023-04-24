const { Review, User, Product } = require("../db.js");
const createReview = async ({ content, rating, idProperty, idUser }) => {
  if (!content && !idUser && !idProperty && !rating)
    throw new Error("un nuevo post debe recibir: content, id_user y id_property");

  await Review.create({
    rating: rating,
    content,
    property_id: idProperty,
    user_id: idUser,
  });
  return "Thanks for your comment"
};

module.exports = createReview;
