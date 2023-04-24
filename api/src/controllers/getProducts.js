const { Product } = require("../db");
const { data } = require("./data");

const data1 = data.map((product) => {
  return {
    name: product.name,
    imagen: product.imagen,
    size: product.size,
    price: product.price,
    description: product.description,
    stock: product.stock,
    id_type: product.type_id,
    id_brand: product.brands_id,
  };
});

const getProducts = async (sort, filters) => {
  let orderBy = [];
  // Ordena los productos según el parámetro de ordenamiento recibido en el URL
  if (sort === "priceAsc") {
    orderBy = [["price", "ASC"]];
  } else if (sort === "priceDesc") {
    orderBy = [["price", "DESC"]];
  } else if (sort === "nameAsc") {
    orderBy = [[fn("TRIM", col("name")), "ASC"]];
  } else if (sort === "nameDesc") {
    orderBy = [[fn("TRIM", col("name")), "DESC"]];
  }

  let where = {}; // Objeto para construir las condiciones de filtro

  // Aplica los filtros recibidos en el URL al objeto "where"
  if (filters && filters.type) {
    where.id_type = filters.type;
  }
  if (filters && filters.brand) {
    where.id_brand = filters.brand;
  }

  const products = await Product.findAll({ where, order: orderBy });

  if (products.length === 0) {
    const productDb = await Product.bulkCreate(data1);
    return productDb;
  }
  return products;
};

module.exports = getProducts;
