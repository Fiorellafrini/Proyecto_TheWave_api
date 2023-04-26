const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Shop",
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true,
      //   allowNull: false,
      //   autoIncrement: true,
      // },
      shop_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },

    {
      timestamps: false,
    }
  );
};
