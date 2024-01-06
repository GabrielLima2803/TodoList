const User = require('../models/User');
const Task = require('../models/Task');
const taskService = require('../services/taskService')

async function addTask(req, res) {
  const { name, description} = req.body;
  console.log(req.user);
  console.log(req.user.name);
  console.log(req.user.id);


  try {
      const userId = req.user.id;
      console.log(`User ID: ${userId}`)
      const newTask = new Task({
          name,
          description,
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
  const { name, description} = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { name, description },
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


async function buscarPorName(req, res) {
  const userId = req.user.id;
  const nome = req.params.name; 
  
  try {
      const taskEncontradas = await taskService.buscarTaskPorUsuario(userId, nome);
      console.log(`Tarefas encontradas - ${taskEncontradas}`);
  
      if (!taskEncontradas || taskEncontradas.length === 0) {
          return res.status(404).send('Nenhuma tarefa encontrada para o usuário atual com o nome fornecido.');
      }
  
      return res.send(taskEncontradas);
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Erro durante a busca de tarefas por usuário e nome.' });
  }
}

async function deleteTask(req, res) {
  const taskId = req.params._id;

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: taskId });

    if (!deletedTask) {
      return res.status(404).json({ success: false, error: 'Tarefa não encontrada' });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);

    user.Tasks.pull(taskId);
    await user.save();

    res.json({ success: true, task: deletedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
module.exports = {
    addTask,
    getTask,
    updateTask,
    buscarPorName,
    deleteTask,
}