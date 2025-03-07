require('dotenv').config();
const { Client } = require('pg');
const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'TaskManagement',
    password: process.env.DB_PASSWORD || '12345',
    port: process.env.DB_PORT || 5432,
});
client.connect()
    .then(() => console.log('PostgreSQL Connected Successfully!'))
    .catch(err => console.error(' PostgreSQL Connection Error:', err));

module.exports = client;
