const { Router } = require("express");
const filterRouter = Router();
const { Product, Type } = require("../db");
const { Op } = require("sequelize");

// // filterRouter.get("/brand", async (req, res) => {});

filterRouter.get("/:type_id", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Type,
          where: {
            name: req.params.name,
          },
        },
      ],
    });
    res.status(200).json(products);
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
