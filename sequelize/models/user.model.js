const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        is_admin: {
            allowNull: false,
            defaultValue: false,
            type: DataTypes.BOOLEAN
        }
    })
}