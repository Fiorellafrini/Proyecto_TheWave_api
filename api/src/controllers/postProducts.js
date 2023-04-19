const { Product, Type, Brand } = require("../db");
const User = require("../db.js")

const postProducts = async (product) => {
  try {
    const { name, imagen, size, price, id_type, id_brand, description } = product;
    if (!name && !imagen && !size && !price && !description) {
      throw new Error("Missing Information");
    }
    const newProduct = await Product.create({
      name,
      imagen,
      size,
      price,
      description,
      id_type,
      id_brand

    });
    const types = await Type.findOne({where: {id_type: id_type}});
    const brands = await Brand.findOne({where: {id_brand:id_brand}});
    newProduct.setType(types);
    newProduct.setBrand(brands);
  return "exito"
  }
  catch (error) {
    return error.message;
  }

};

module.exports = postProducts;
