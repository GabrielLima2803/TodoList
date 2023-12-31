const User = require('../models/User');
const Task = require('../models/Task');

async function addTask(req, res) {
  const { name, description, term, isCompleted } = req.body;
  console.log(req.user);
  console.log(req.user.name);
  console.log(req.user.id);


  try {
      const userId = req.user.id;
      console.log(`User ID: ${userId}`)
      const newTask = new Task({
          name,
          description,
          term,
          isCompleted,
      });
      console.log(`New Task: ${newTask}`)
      await newTask.save();

      const user = await User.findById(userId);
      user.Tasks.push(newTask);
      await user.save();

      res.status(201).json({ success: true, task: newTask });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

async function getTask(req, res){
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).populate('Tasks')
    res.json(user.Tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter as task do usuário' });
  }
}

async function updateTask(req, res) {
  const taskId = req.params._id;
  const { name, description, term, isCompleted } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { name, description, term, isCompleted },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ success: false, error: 'Tarefa não encontrada' });
    }

    res.json({ success: true, task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}


module.exports = {
    addTask,
    getTask,
    updateTask,
}