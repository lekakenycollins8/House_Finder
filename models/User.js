const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    googleId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    displayName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('landlord', 'renter'),
        allowNull: true,
    }
});

module.exports = User;