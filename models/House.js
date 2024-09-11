const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const House = sequelize.define('House', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    imageUrls: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    availableFrom: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

House.belongsTo(User, { foreignKey: 'ownerId' });
User.hasMany(House, { foreignKey: 'ownerId' });

module.exports = House;