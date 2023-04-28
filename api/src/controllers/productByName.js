const { Product } = require("../db");
// const getProducts = require("./getProducts");
const { Op } = require("sequelize")


const byName = async (name) => {
  if (typeof name !== "string") {
    throw Error("Invalid input: name must be a string");
  }

  console.log('name:', name);
  const dataName = await Product.findAll({
    
    where: {
      name: { [Op.iLike]: `%${name}%` },
      // name: { [Op.iLike]: sequelize.fn('LOWER', `%${name}%`) }
    },
  });
  if (dataName.length) return dataName;
  throw Error(`There is no product with the name: ${name} `);
};



module.exports = byName;
