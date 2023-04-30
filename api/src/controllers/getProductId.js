const {  Review, Product} = require("../db");

const getProductId = async (id) => {
  try {
    const product = await Product.findOne({
      where: {id_product:id},
      include:[Review]
});
    if (!product) throw new Error("Product not found");
    return product
  } catch (error) {
    return error.message
  }
};

module.exports = getProductId;
