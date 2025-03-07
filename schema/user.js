const client = require("../db/postgresSql");

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

client.query(createUsersTable)
  .then(() => console.log(" Users table created successfully!"))
  .catch(err => console.error("Error creating users table:", err));

module.exports = client;
