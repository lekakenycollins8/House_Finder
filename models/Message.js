const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const House = require('./House');

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    senderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    receiverId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    houseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: House,
            key: 'id',
        },
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Message;