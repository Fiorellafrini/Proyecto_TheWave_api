const axios = require("axios");
const { Product, Brand, Type } = require("../db");

// const getProducts = async () => {
//   const fieldId = "1I3hyk2bWiAgWZ7uSQYKocKVPAZfI7Fus"; //Id del archivo json del drive
//   const url = `https://drive.google.com/uc?id=${fieldId}&export=download`;

//   try {
//     const response = await axios.get(url);
//     const products = response.data;

//     // Itera sobre los productos y crea una entrada en la base de datos
//     // let count = 0;
//     for (const product of products) {
//       await Product.create({
//         id: product.id,
//         name: product.name,
//         imagen: product.imagen,
//         size: product.size,
//         price: product.price,
//         active: product.active,
//       });
//       // console.log(product.name);

//       // count++;
//     }
//     // console.log(`Se crearon ${count} productos`);

//     // Retorna todos los productos en la base de datos
//     const allProducts = await Product.findAll();
//     return allProducts;
//   } catch (error) {
//     return error.message;
//   }
// };

// module.exports = getProducts;
const getProducts = async () => {
  const url = `https://run.mocky.io/v3/135bd59d-e1de-4592-8e9d-0cdea3c2bfab`;

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
        },
      });
    }

    // Retorna todos los productos en la base de datos
    const allProducts = await Product.findAll({
      include: [
        {
          model: Brand,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    return allProducts;
  } catch (error) {
    return error.message;
  }
};

module.exports = getProducts;
