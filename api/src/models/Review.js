const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Review",
    {
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rating: {
        // REVISAR
        type: DataTypes.INTEGER,
        allowNull: true, // porque puede ser que aun no este calificada
      },
    },
    {
      timestamps: false,
    }
  );
};
