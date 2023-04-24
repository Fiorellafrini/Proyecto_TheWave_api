const { Product } = require("../db");

// const upDateActive = async (id, body) => {
//   const { name, imagen, size, price, description, stock, quantity, id_type, id_brand } = body;

//   try {
//     const product = await Product.findOne({ where: { id } });

//     if (product) {
//       await product.update({
//         name,
//         imagen,
//         size,
//         price,
//         description,
//         stock,
//         quantity,
//         id_type,
//         id_brand,
//         active: body.active,
//       }, { individualHooks: true }); // Agregamos la opción individualHooks: true

//       return product;
//     } else {
//       throw new Error("The specified product was not found");
//     }
//   } catch (error) {
//     console.log(error);
//     throw new Error("There was an error updating the product");
//   }
// };
const upDateActive = async (id, body) => {
  const product = await Product.findByPk(id);
  if (!product) {
    throw new Error(`product id not found ${id}`);
  }
  await product.set(body); //lo actualiza
  await product.save(); //lo guarda
  return product;
};

module.exports = upDateActive;
