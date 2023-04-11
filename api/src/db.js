require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const sequelize = new Sequelize(
    `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
    .filter(
        (file) =>
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
    )
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
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
const { User, Type, Review, Product, Course, Brand } = sequelize.models;

// Aca vendrian las relaciones

Product.hasMany( Review, { foreignKey: "product_id", sourceKey: "id" });
Review.belongsTo(Product, { foreignKey: "product_id", targetKey: "id" });

User.hasMany(Review, { foreignKey: "user_id", sourceKey: "id" });
Review.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });
//----------------------
User.hasMany(Product,{ foreignKey: "id_user", sourceKey: "id" })
Product.belongsTo(User,{ foreignKey: "id_user", targetKey: "id" })
/*
Booking.hasOne(Property,{foreignKey:"autor_propId", sourceKey: "id"})
Property.belongsTo(Booking,{foreignKey:"autor_propId", targetKey: "id" }) */
//------------
/* Course.hasMany(Booking,{ foreignKey: "autor_saleId", sourceKey: "id" })
Booking.belongsTo(Sale,{ foreignKey: "autor_saleId", targetKey: "id" }) */

/* Sale.hasOne(Property,{as:"propiedades",foreignKey:"saleId"})
Property.belongsTo(Sale,{as:"ventas",foreignKey:"saleId"}) */
//---------------------
User.belongsToMany(Course,{through:"course_user"});
Course.belongsToMany(User, {through:"course_user"});

Type.hasMany(Product, { foreignKey: "type" });
Product.belongsTo(Product, { foreignKey: "type", field: "name" });

Brand.hasMany(Product, { foreignKey: "brand" });
Product.belongsTo(Product, { foreignKey: "brand", field: "name" });
module.exports = {
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};