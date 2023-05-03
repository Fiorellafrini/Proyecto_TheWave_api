const { Router } = require("express");
const productRouter = Router();
const { Product } = require("../db");
const getProductId = require("../controllers/getProductId");
const getProducts = require("../controllers/getProducts");
const postProducts = require("../controllers/postProducts");
const byName = require("../controllers/productByName");
const upDateProduct = require("../controllers/putProduct");
const updateProductActive = require ("../controllers/activeProduct")
// const deleteProduct = require("../controllers/deleteProduct");

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
  // http://localhost:3001/product?sort=priceDesc&type=1&nameDesc(con esto hacen las combinaciones como quieren en el insomnia)
  // http://localhost:3001/product?sort=priceAsc&brand=1
  try {
    const { name, page = 0, size = 5, sort, type, brand } = req.query; //  parámetros de la URL

    if (page && size) {
      let options = {
        limit: +size,
        offset: +page * +size,
      };

      const { count, rows } = await Product.findAndCountAll(options);

      return res.json({
        total: count,
        products: rows,
      });
    }

    let getAllProducts;
    if (sort) {
      // Si se proporciona el parámetro de ordenamiento "sort", utiliza la función getProducts con el valor de sort
      getAllProducts = await getProducts(sort);
    } else {
      // Si no se proporciona el parámetro de ordenamiento, utiliza la función getProducts sin ningún parámetro
      getAllProducts = await getProducts();
    }

    if (name) {
      const products = await byName(name);
      if (products) return res.status(200).json(products);
    }

    // Construye el objeto de filtros para aplicar en la función getProducts
    const filters = {};
    if (type) {
      filters.type = type;
    }
    if (brand) {
      filters.brand = brand;
    }

    // Aplica los filtros en la función getProducts y obtiene los productos filtrados
    const filteredProducts = await getProducts(sort, filters);

    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

////////////////////////////////////////////// BY NAME ////////////////////////////////////////////////



////////////////////////////////////////// POST PRODUCTS /////////////////////////////////////////////////

productRouter.post("/", async (req, res) => {
  try {
    const postProduct = await postProducts(req.body);
    // if (!postProduct) throw Error("product not found");
    res.status(201).json(postProduct);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

//////////////////////////////////////////////// PUT ACTIVE PRODUCT /////////////////////////////////////////////////


productRouter.put("/:id/", async (req, res) => {

  const { id } = req.params;
  const { body } = req;
  try {
    const product = await upDateProduct(id, body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});




///////////////////////////////////////// Active/Inactice ////////////////////////////////////////////////

productRouter.put("/active/:id", async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  console.log(req.body)
  try {
    const product = await Product.findOne({ where: { id: id } });
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    const updatedProduct = await updateProductActive(id, active);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});



module.exports = productRouter;
