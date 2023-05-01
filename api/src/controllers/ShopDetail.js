const { ShopDetail, Shop, Product } = require('../db');


async function createShopDetail(req, res) {
  const { quantity, price, product_id, shop_id } = req.body;

  console.log('shop_id:', shop_id);

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


async function getShopDetails(req, res) {
  try {
    const shopDetails = await ShopDetail.findAll({
      include: [{ model: Product }]
    });
    res.json(shopDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



module.exports = {createShopDetail, getShopDetails};
