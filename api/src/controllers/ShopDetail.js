const { ShopDetail, Shop, Product } = require('../db');


async function createShopDetail(req, res) {
  const { quantity, price, product_id, shop_id } = req.body;

  try {
    const newShopDetail = await ShopDetail.create({
      quantity,
      price,
      product_id,
      shop_id
    });
    res.status(201).json(newShopDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = createShopDetail;
