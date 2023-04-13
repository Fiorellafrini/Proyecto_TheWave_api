const { Product } = require("../db");
// const getProducts = require("./getProducts");
const { Op } = require("sequelize")

// const byName = async (name) => {
// //   console.log("name:", name);
//   const data = await getProducts();

//   if (!data) throw Error("data no found");

//   let productByName = data.filter((product) =>
//     product.name.toLowerCase().includes(name.toLowerCase())
//   );

//   if (!productByName.length) throw Error("Product name not found");

//   return productByName;
// // };
const byName = async (name) => {
  if (typeof name !== "string") {
    throw Error("Invalid input: name must be a string");
  }

  console.log('name:', name);
  const dataName = await Product.findAll({
    
    where: {
      name: { [Op.iLike]: `%${name}%` },
    },
  });
  if (dataName.length) return dataName;
  throw Error(`There is no product with the name: ${name} `);
};



module.exports = byName;
