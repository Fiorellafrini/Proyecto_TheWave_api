const { Router } = require("express");
const filterRouter = Router();
const { Product, Type, Brand } = require("../db");

filterRouter.get("/type/:id_type", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        id_type: req.params.id_type,
      },
      include: Type,
    });
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

filterRouter.get("/brands/:id_brand", async (req, res) => {
  try {
    const product = await Product.findAll({
      where: {
        id_brand: req.params.id_brand,
      },
      include: Brand,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = filterRouter;
