
// const { Product } = require("../db");

// const deleteProduct = async (id) => {
//   try {
//     const product = await Product.findOne({ where: { id } });
//     if (product) {
//       await product.update({ active: false });
//       return "Product deleted";
//     } else {
//       return { error: "Product not found" };
//     }
//   } catch (error) {
//     return { error: error.message };
//   }
// };
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