const { Product, Type, Brand } = require("../db");

const postProducts = async (product) => {
  try {

    let { name, imagen, size, price, id_type, id_brand } = product;
    if (!name && !imagen && !size && !price ) {
      throw new Error("Missing Information");
    }
    id_type = parseInt(id_type);
    id_brand = parseInt(id_brand);
    
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
  return "exito al crear el producto"
  }
  catch (error) {
    return error.message;
  }

};

module.exports = postProducts;
