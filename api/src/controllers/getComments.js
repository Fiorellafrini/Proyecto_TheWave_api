const { Comment } = require("../db");

const getComment = async () => {
  const comentarios = await Comment.findAll({
    where: {
      soft_delete: false,
    },
  });
  return comentarios;
};

const getAllComments = async () => {
  const comentarios = await Comment.findAll();
  return comentarios;
};

module.exports = { getComment, getAllComments };
