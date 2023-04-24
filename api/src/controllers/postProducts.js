const { Product, Type, Brand } = require("../db");
const User = require("../db.js")

const postProducts = async (product) => {
  let { name, imagen, description, size, price, id_type, id_brand, stock } = product;

  if (!name || !imagen || !size || !price || !description ) {
    switch (
      true // handle errors individually in case a specific piece of information is missing
    ) {
      case !name:
        throw new Error("Please insert the name for the new product.");
      case !imagen:
        throw new Error("Please insert an image for the new product.");
      case !size:
        throw new Error("Please insert the size for the new product.");
      case !price:
        throw new Error("Please insert a price for the new product.");
      case !description:
        throw new Error("Please insert a description for the new product.");

      default:
        break;
    }
  } else {
    id_type = parseInt(id_type);
    id_brand = parseInt(id_brand);

    const newProduct = await Product.create({
      name,
      imagen,
      description,
      size,
      price,
      stock,
      id_type,
      id_brand,
    });
    const types = await Type.findOne({ where: { id_type: id_type } });
    const brands = await Brand.findOne({ where: { id_brand: id_brand } });
    newProduct.setType(types);
    newProduct.setBrand(brands);
    return "exito al crear el producto";
  }
};

module.exports = postProducts;
