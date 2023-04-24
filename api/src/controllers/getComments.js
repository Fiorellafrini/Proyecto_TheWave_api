const { Review } = require("../db");

const getComment = async () => {
  const comentarios = await Review.findAll({
    where: {
      soft_delete: false,
    },
  });
  return comentarios;
};

const getAllComments = async () => {
  const comentarios = await Review.findAll();
  return comentarios;
};

module.exports = { getComment, getAllComments };
