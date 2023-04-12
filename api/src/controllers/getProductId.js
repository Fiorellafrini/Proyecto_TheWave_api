const { Product } = require("../db");

const getProductId = async (id) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");
    return product
  } catch (error) {
    return error.message
  }
};

module.exports = getProductId;
