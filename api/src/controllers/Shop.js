const { Shop, ShopDetail, User, Product } = require("../db");
//---------------------------------CREO UNA ORDER EN DB---------------------------------------------//
async function shopProduct(req, res) {
  const { date, user_id } = req.body;

  try {
    const order = await Shop.create({
      date,
      id_user: user_id,
    });
    return res.status(200).json({ order });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
//--------------------------------------VER TODAS LAS COMPRAS-------------------------------------------------------------//
async function getAllShop(req, res) {
  try {
    const compras = await Shop.findAll({
      include: [
        { model: ShopDetail, include: [{ model: Product }] },
        { model: User },
      ],
    });
    res.status(200).json(compras);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { shopProduct, getAllShop };
