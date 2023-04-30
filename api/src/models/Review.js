const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Review",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        field: "id_review",
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rating: {
        // REVISAR
        type: DataTypes.INTEGER,
        allowNull: false, // porque puede ser que aun no este calificada
      },
    },
    {
      paranoid: true,
    }
  );
};
