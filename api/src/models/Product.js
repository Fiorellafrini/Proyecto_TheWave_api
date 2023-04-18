const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        field: "id_product",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        // unique: true,
      },
      imagen: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      size: {
        type: DataTypes.ENUM("S", "M", "L", "XL", "XXL", "TU"),
        defaultValue: "TU",
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
