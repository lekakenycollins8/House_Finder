const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.SUPABASE_DB_HOST,
    process.env.SUPABASE_DB_NAME,
    process.env.SUPABASE_DB_PASSWORD,
    {
        host: process.env.SUPABASE_DB_HOST,
        dialect: 'postgres',
        port: process.env.SUPABASE_DB_PORT,
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;