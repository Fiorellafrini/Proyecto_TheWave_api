const { Router } = require("express");
const productRouter = Router();
const { Product } = require("../db");
const getProductId = require("../controllers/getProductId");
const getProducts = require("../controllers/getProducts");
const postProducts = require("../controllers/postProducts");
const byName = require("../controllers/productByName");

//////////////////////////////////////// GET PRODUCT ID ///////////////////////////////////////////////////

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productId = await getProductId(id);
    res.status(200).json(productId);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

///////////////////////////////////////// GET PRODUCTS ///////////////////////////////////////////////////

productRouter.get("/", async (req, res) => {
  try {
    const getAllProducts = await getProducts();
    res.status(200).json(getAllProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

////////////////////////////////////////////// BY NAME ////////////////////////////////////////////////

productRouter.get("/name", async (req, res) => {
  const { name } = req.query;
  // console.log("Name value:", name);
  try {
    const products = await byName(name);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

////////////////////////////////////////// POST PRODUCTS /////////////////////////////////////////////////

productRouter.post("/post", async (req, res) => {
  try {
    const postProduct = await postProducts(req.body);
    if (!postProduct) throw Error("product not found");
    res.status(200).json(postProduct);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

//////////////////////////////////////////////// DELETE /////////////////////////////////////////////////

productRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await Product.findByPk(id);
    deleteProduct.destroy();
    res.status(200).json(deleteProduct);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

module.exports = productRouter;
