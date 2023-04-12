const { Product } = require("../db");

const postProducts = async (product) => {
  try {
    const { name, image, size, price } = product;
    if (!name || !image || !size || !price)
      throw new Error("Missing Information");
    const newProduct = await Product.create({
      name,
      image,
      size,
      price,
    });
    return newProduct;
  } catch (error) {
    return error.message;
  }
};

module.exports = postProducts;
