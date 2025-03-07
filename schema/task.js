const task = require("../db/postgresSql");

const createTasksTable = `
  CREATE TABLE IF NOT EXISTS tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

task.query(createTasksTable)
  .then(() => console.log("Tasks table created successfully!"))
  .catch(err => console.error("Error creating tasks table:", err));

module.exports = task;
