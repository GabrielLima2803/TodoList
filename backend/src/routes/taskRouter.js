const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.post('/add-task', taskController.AddTask);



module.exports = router;