const { Favorite, Product, User } = require("../db");

async function addToFavorites(req, res) {
  const { userId, productId } = req.body;

  try {
    const user = await User.findByPk(userId);

    const favorite = await Favorite.create({
      id_user: userId,
      product_id: productId,
    });

    res.status(200).json(favorite);
  } catch (err) {
    console.error(err);
    res.status(400).json({ err: err.message });
  }
}

//---------------DELETE FAV-----------------------------------------------------//
async function removeFromFavorites(req, res) {
  const { id_user, product_id } = req.params;
  Favorite.destroy({ where: { id_user: id_user, product_id: product_id } })
    .then(() => {
      res.status(200).send({ product_id: product_id });
    })
    .catch((err) => {
      res.status(400).send({ error: err.message });
    });
}

//-------------------TODOS LOS FAV DE UN USUARIO-----------------------------------//

async function getFavorites(req, res) {
  try {
    const { id_user } = req.params;
    const user = await User.findByPk(id_user);
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    const favorites = await Favorite.findAll({
      where: { id_user: id_user },
      include: [{ model: Product }],
    });
    return res.json(favorites);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = { addToFavorites, removeFromFavorites, getFavorites };
