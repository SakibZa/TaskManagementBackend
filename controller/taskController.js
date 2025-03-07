const task = require('../schema/task');

module.exports.createTask = async (req, res) => {
    try {
        const { title, description, status, due_date } = req.body;
        const user_id = req.user.id; 

        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        const query = `INSERT INTO tasks (title, description, status, user_id, due_date) 
                       VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [title, description || null, status || 'pending', user_id, due_date || null];

        const result = await task.query(query, values);
        res.status(201).json({ message: "Task created successfully", task: result.rows[0] });
    } catch (err) {
        console.error("Error creating task:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
module.exports.getTaskById = async (req, res) => {
    try {
        const { id } = req.params; 
        const user_id = req.user.id; 

        const query = `SELECT * FROM tasks WHERE id = $1 AND user_id = $2`;
        const values = [id, user_id];

        const result = await task.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Task not found or you don't have access" });
        }

        res.status(200).json({ task: result.rows[0] });
    } catch (err) {
        console.error("Error fetching task:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
module.exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, due_date } = req.body;
        const user_id = req.user.id; 
        const checkQuery = `SELECT * FROM tasks WHERE id = $1 AND user_id = $2`;
        const checkResult = await task.query(checkQuery, [id, user_id]);

        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: "Task not found or you don't have permission to update" });
        }
        const updateQuery = `
            UPDATE tasks
            SET title = COALESCE($1, title), 
                description = COALESCE($2, description), 
                status = COALESCE($3, status), 
                due_date = COALESCE($4, due_date)
            WHERE id = $5 AND user_id = $6
            RETURNING *`;
        const values = [title, description, status, due_date, id, user_id];

        const result = await task.query(updateQuery, values);

        res.status(200).json({ message: "Task updated successfully", task: result.rows[0] });
    } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
module.exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params; 
        const user_id = req.user.id; 
        const checkQuery = `SELECT * FROM tasks WHERE id = $1 AND user_id = $2`;
        const checkResult = await task.query(checkQuery, [id, user_id]);

        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: "Task not found or you don't have permission to delete" });
        }

      
        const deleteQuery = `DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *`;
        const result = await task.query(deleteQuery, [id, user_id]);

        res.status(200).json({ message: "Task deleted successfully", deletedTask: result.rows[0] });
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
module.exports.getAllTasks = async (req, res) => {
    try {
        console.log("Inside getAllTasks");
      const user_id = req.user.id;
        console.log("User ID:", user_id);
        const query = `SELECT * FROM tasks WHERE user_id = $1`;
        const result = await task.query(query, [user_id]);

        res.status(200).json({ tasks: result.rows });
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Internal server error" });
    }
    };