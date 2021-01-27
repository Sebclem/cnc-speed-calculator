const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('preset_step_down_factor',{
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        k_less_2: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        k_more_2: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        k_more_3: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        k_more_4: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        k_more_5: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        k_more_6: {
            allowNull: false,
            type: DataTypes.FLOAT,
        }
    })
}