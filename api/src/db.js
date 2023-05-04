require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY } =
  process.env;
//-------------------------------- CONFIGURACION PARA TRABAJAR LOCALMENTE-----------------------------------
const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
// -------------------------------------CONFIGURACION PARA EL DEPLOY---------------------------------------------------------------------
// const sequelize = new Sequelize( DB_DEPLOY, {
//       logging: false, // set to console.log to see the raw SQL queries
//       native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//     }
//   );

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Type, Review, Product, Brand, Shop, ShopDetail, Favorite } =
  sequelize.models;

// Aca vendrian las relaciones

User.hasMany(Review, { foreignKey: "id_user" });
Product.hasMany(Review, { foreignKey: "id_product" });
Review.belongsTo(User, { foreignKey: "id_user" });
Review.belongsTo(Product, { foreignKey: "id_product" });
//---------------------------------------------------------------------------------//

User.hasMany(Shop, { foreignKey: "id_user" });
Shop.belongsTo(User, { foreignKey: "id_user" });

Product.hasMany(ShopDetail, { foreignKey: "id_product" });
ShopDetail.belongsTo(Product, { foreignKey: "id_product" });

ShopDetail.belongsTo(Shop, { foreignKey: "shop_id" });
Shop.hasMany(ShopDetail, { foreignKey: "shop_id" });

//-----------------------------------------------------------------------------------//
Type.hasMany(Product, { foreignKey: "id_type" });
Product.belongsTo(Type, { foreignKey: "id_type" });

Brand.hasMany(Product, { foreignKey: "id_brand" });
Product.belongsTo(Brand, { foreignKey: "id_brand" });
//-----------------------------------------------------------------------------------//

 User.hasMany(Favorite, { foreignKey: 'id_user' }); 
Favorite.belongsTo(User, { foreignKey: 'id_user' });

Product.hasMany(Favorite, { foreignKey: 'product_id' });
Favorite.belongsTo(Product, { foreignKey: 'product_id' });

//---------------------------------------------------------------------------------//
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
