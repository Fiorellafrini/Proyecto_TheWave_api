const axios = require("axios");
const { Product } = require("../db");

const getProducts = async () => {
  const fieldId = "1I3hyk2bWiAgWZ7uSQYKocKVPAZfI7Fus"; //Id del archivo json del drive
  const url = `https://drive.google.com/uc?id=${fieldId}&export=download`;

  try {
    const response = await axios.get(url);
    const products = response.data;

    // Itera sobre los productos y crea una entrada en la base de datos
    let count = 0;
    for (const product of products) {
      await Product.create({
        id: product.id,
        name: product.name,
        imagen: product.imagen,
        size: product.size,
        price: product.price,
        active: product.active,
      });
      // console.log(product.name);

      count++;
    }
    // console.log(`Se crearon ${count} productos`);

    // Retorna todos los productos en la base de datos
    const allProducts = await Product.findAll();
    return allProducts;
  } catch (error) {
    return error.message;
  }
};

module.exports = getProducts;
