const axios = require("axios");
const { Product, Brand, Type } = require("../db");

const getProducts = async () => {
  // const fieldId = "1I3hyk2bWiAgWZ7uSQYKocKVPAZfI7Fus"; //Id del archivo json del drive
  // const url = `https://drive.google.com/uc?id=${fieldId}&export=download`;
  const url = `https://run.mocky.io/v3/beb6f7e4-02ac-476b-ad22-b284e9b3b240`

  try {
    const response = await axios.get(url);
    const products = response.data;

    // Itera sobre los productos y crea una entrada en la base de datos
    for (const product of products) {
      await Product.findOrCreate({
        where: { name: product.name },
        defaults: {
          // name: product.name,
          imagen: product.imagen,
          size: product.size,
          price: product.price,
          active: product.active,
          type_id: product.type_id,
          // brands_id: product.brand,
        },
      });
    }

    // Retorna todos los productos en la base de datos
    const allProducts = await Product.findAll();
    return allProducts;
  } catch (error) {
    return error.message;
  }
};

module.exports = getProducts;
