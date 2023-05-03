const { Review} = require("../db.js");
const createReview = async ({ comment, rating, idProduct, idUser }) => {
  if (!comment&& !idUser && !idProduct && !rating)
    throw new Error("un nuevo post debe recibir: content, id_user y id_property");

  const review = await Review.create({
    rating: rating,
    comment,
    id_product: idProduct,
    id_user: idUser,
  });
  
  return "Thanks for your comment"
};

module.exports = createReview;
