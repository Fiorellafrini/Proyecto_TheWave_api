
const { Product } = require ("../db");

const updateProductActive = async (id, active) => {
  try {
    const product = await Product.findOne({ where: { id: id } });
    if (!product) {
      throw new Error("Product not found");
    }
    await Product.update({ active: active }, { where: { id: id } });
    const updatedProduct = await Product.findOne({ where: { id: id } });
    return updatedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports= updateProductActive;