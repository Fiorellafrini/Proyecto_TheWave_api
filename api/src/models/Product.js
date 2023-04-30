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
        allowNull: true,
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
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // por defecto, los productos están activos
      },
      // deletedAt: {
      //   type: DataTypes.DATE,
      //   allowNull: true,
      //   defaultValue: null,
      // },
    },
    {
      paranoid: true,
    }
  );
};
