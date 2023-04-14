const { Router } = require("express");
const filterRouter = Router();
const { Product, Type, Brand } = require("../db");

filterRouter.get("/:type_id", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        type_id: req.params.type_id,
      },
      include: Type,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

filterRouter.get("/brands/:brands_id", async (req, res) => {
  try {
    const product = await Product.findAll({
      where: {
        brands_id: req.params.brands_id,
      },
      include: Brand,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = filterRouter;
