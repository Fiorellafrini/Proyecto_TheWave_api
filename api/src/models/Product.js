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
      type_id: {
        type:DataTypes.INTEGER
      },
    },
    {
      timestamps: false,
    }
  );
};
