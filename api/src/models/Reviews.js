const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Reviews', 
  {
    
    comments:{
        type: DataTypes.STRING,
        allowNull: true
    },
    rating: {  // REVISAR
        type: DataTypes.FLOAT,
        allowNull: true // porque puede ser que aun no este calificada
        
    },
   
},  
{
    timestamps: false
}
);
};
    