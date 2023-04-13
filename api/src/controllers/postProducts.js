const { Product } = require("../db");

const postProducts = async (product) => {
  try {
    const { name, imagen, size, price } = product;
    if (!name || !imagen || !size || !price)
      throw new Error("Missing Information");
    const newProduct = await Product.create({
      // const newProduct = await Product.findOrCreate({
      name,
      imagen,
      size,
      price,
    });
    return newProduct;
  } catch (error) {
    return error.message;
  }
};

module.exports = postProducts;
