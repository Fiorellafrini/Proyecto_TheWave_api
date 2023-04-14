const { Router } = require("express");
const filterRouter = Router();
const { Product, Type, Brand } = require("../db");
const { Op } = require("sequelize");

// // filterRouter.get("/brand", async (req, res) => {});

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

// let info = require("../controllers/info");

// filterRouter.get("/:typeName", async (req, res) => {
//   try {
//     console.log(info);
//     const filteredData = info.filter(
//       (product) => product.typeName === req.params.typeName
//     );
//     res.status(200).json(filteredData);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

module.exports = filterRouter;
