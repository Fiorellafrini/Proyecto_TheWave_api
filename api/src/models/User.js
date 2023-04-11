const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('User', 
    {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        validate: { 
            isEmail: true 
        },
        email:{
            type : DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        admin:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        active:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    },  
    {
        timestamps: false
    }
    );
};