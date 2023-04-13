const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Course",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        //REVISAR
        type: DataTypes.STRING,
      },
      teacher: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
