const express = require('express');
const taskController = require('../controllers/taskController');
const checkToken = require('../middleware/checkToken');

const router = express.Router();

router.post('/add-task', checkToken, taskController.addTask);
router.get('/get-task', checkToken, taskController.getTask);
router.put('/put-task/:_id', checkToken, taskController.updateTask);
router.delete('/delete-task/:_id', checkToken, taskController.deleteTask);
router.get('/filter/:name', checkToken, taskController.buscarPorName)



module.exports = router;