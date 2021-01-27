const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('preset_cut', {
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
        cut_speed: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        feed_by_tooth_more_1: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        feed_by_tooth_more_2: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        feed_by_tooth_more_3: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        feed_by_tooth_more_4: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        feed_by_tooth_more_5: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        feed_by_tooth_more_6: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        feed_by_tooth_more_8: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
    })
}