const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Product",
    {
      
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: { // REVISAR
        type: DataTypes.ARRAY,
        allowNull: false,
      },
      size: {
        type: DataTypes.ENUM('S','M','L','XL','TU'),
        defaultValue: 'TU',
        allowNull: false
      },
      price: { // REVISAR
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};












