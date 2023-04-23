const { Product } = require("../db");
const { data } = require("./data");



const getProducts = async () => {
  try {
    const products = data;

    // Itera sobre los productos y crea una entrada en la base de datos
    for (const product of products) {
      await Product.findOrCreate({
        where: { name: product.name },
        defaults: {
          imagen: product.imagen,
          size: product.size,
          price: product.price,
          description: product.description,
          id_type: product.type_id,
          id_brand: product.brands_id
        },
      });
    }

   
    const allProducts = await Product.findAll();
    return allProducts;
  } catch (error) {
    throw new Error(error.message);
  }
};


// const getProducts = async (sort, filters) => {
// const {fn, col} =require ("sequelize")
//   try {
//     const products = data;

//     // Itera sobre los productos y crea una entrada en la base de datos
//     for (const product of products) {
//       await Product.findOrCreate({
//         where: { name: product.name },
//         defaults: {
//           imagen: product.imagen,
//           size: product.size,
//           price: product.price,
//           description: product.description,
//           id_type: product.type_id,
//           id_brand: product.brands_id
//         },
//       });
//     }

//     let orderBy = [];
//     // Ordena los productos según el parámetro de ordenamiento recibido en el URL
//     if (sort === 'priceAsc') {
//       orderBy = [["price", "ASC"]];
//     } else if (sort === 'priceDesc') {
//       orderBy = [["price", "DESC"]];
//     } else if (sort === 'nameAsc') {
//       orderBy = [[fn("TRIM", col("name")), "ASC"]];
//     } else if (sort === 'nameDesc') {
//       orderBy = [[fn("TRIM", col("name")), "DESC"]];
//     }

//     let where = {}; // Objeto para construir las condiciones de filtro

//     // Aplica los filtros recibidos en el URL al objeto "where"
//     if (filters && filters.type) {
//       where.id_type = filters.type;
//     }
//     if (filters && filters.brand) {
//       where.id_brand = filters.brand;
//     }

//     // Retorna todos los productos en la base de datos con los filtros y ordenamientos aplicados
//     const allProducts = await Product.findAll({ where, order: orderBy });
//     return allProducts;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

module.exports = getProducts;
