const { Sequelize } = require('sequelize');
require('dotenv').config();

// Encode special characters in the password
const encodedPassword = encodeURIComponent(process.env.SUPABASE_DB_PASSWORD);

// Create a connection string
const connectionString = `postgres://${process.env.SUPABASE_DB_USER}:${encodedPassword}@${process.env.SUPABASE_DB_HOST}:${process.env.SUPABASE_DB_PORT}/${process.env.SUPABASE_DB_NAME}`;

// Create a new Sequelize instance using the connection string
const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false, // Set to true if you want to log SQL queries
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

sequelize.sync({force: false})
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch((error) => {
        console.error('Error creating the database and tables:', error);
    });

module.exports = sequelize;
