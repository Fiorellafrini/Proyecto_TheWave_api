const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Type",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_type"
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "name_type"
      },
    },
    {
      timestamps: false,
    }
  );
};
