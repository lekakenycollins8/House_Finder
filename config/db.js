const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.SUPABASE_DB_USER,
    host: process.env.SUPABASE_DB_HOST,
    database: process.env.SUPABASE_DB_NAME,
    password: process.env.SUPABASE_DB_PASSWORD,
    port: process.env.SUPABASE_DB_PORT,
});

module.exports = pool;