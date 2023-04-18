const { Product, Type, Brand } = require("../db");

const postProducts = async (product) => {
  try {
    const { name, imagen, size, price, type, brand, description } = product;
    if (!name && !imagen && !size && !price && !description) {
      throw new Error("Missing Information");
    }
    const newProduct = await Product.create({
      name,
      imagen,
      size,
      price,
      description
    });
    const types = await Type.findAll({where: {id_type:type}});
    const brands = await Brand.findAll({where: {id_brand:brand}});
    newProduct.setType(types);
    newProduct.setBrand(brands);
  return "exito"
  }
  catch (error) {
    return error.message;
  }

};

module.exports = postProducts;
