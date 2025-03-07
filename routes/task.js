const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');
const {verifyToken} = require('../middleware/auth');

router.get('/allTasks', verifyToken, taskController.getAllTasks);

router.post('/create', verifyToken , taskController.createTask);
router.get('/:id', verifyToken, taskController.getTaskById);
router.put('/:id', verifyToken, taskController.updateTask);
router.delete('/:id', verifyToken, taskController.deleteTask);


module.exports = router;