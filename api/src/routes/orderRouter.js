const { Router } = require("express");
const orderRouter = Router();
const { Product } = require("../db");
const { fn, col } = require("sequelize");

orderRouter.get("/price/less", async (req, res) => {
  try {
    const productos = await Product.findAll({
      order: [["price", "ASC"]],
    });

    res.status(200).json(productos);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

orderRouter.get("/price/higher", async (req, res) => {
  try {
    const productos = await Product.findAll({
      order: [["price", "DESC"]],
    });

    res.status(200).json(productos);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

orderRouter.get("/name/asc", async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [[fn("TRIM", col("name")), "ASC"]],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

orderRouter.get("/name/desc", async (req, res) => {
  try {
    const product = await Product.findAll({
      order: [[fn("TRIM", col("name")), "DESC"]],
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = orderRouter;
