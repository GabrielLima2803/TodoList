const User = require('../models/User');
const Task = require('../models/Task');

async function AddTask(req, res) {
    const { name, description, term, isCompleted } = req.body;
  
    if (!name) {
      return res.status(422).json({ error: 'O nome da tarefa é obrigatório!' });
    }
  
    try {
      const novaTarefa = await Task.create({
        name,
        description,
        term,
        isCompleted,
      });
  
      const user = await User.findById(req.user.id);
  
      user.Tasks.push(novaTarefa);
  
      await user.save();
  
      res.status(201).json({ tarefa: novaTarefa });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  module.exports = {
    AddTask,
  }