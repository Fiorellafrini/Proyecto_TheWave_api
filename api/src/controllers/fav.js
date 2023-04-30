const { Favorite, Product, User } = require("../db");

async function addToFavorites(req, res) {
  const { userId, productId } = req.body;

  try {
    const user = await User.findByPk(userId);

    const favorite = await Favorite.create({
      user_id: userId,
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
  const { user_id, product_id } = req.params;
  Favorite.destroy({ where: { user_id: user_id, product_id: product_id } })
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
    const { user_id } = req.params;
    const user = await User.findByPk(user_id);
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    const favorites = await Favorite.findAll({
      where: { user_id: user_id },
      include: [{ model: Product }],
    });
    return res.json(favorites);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = { addToFavorites, removeFromFavorites, getFavorites };
