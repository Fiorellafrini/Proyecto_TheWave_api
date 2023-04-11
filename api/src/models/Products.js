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
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        defaultValue: "Talle Unico",
      },
      price: { // REVISAR
        type: DataTypes.DECIMAL(6,2),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};












