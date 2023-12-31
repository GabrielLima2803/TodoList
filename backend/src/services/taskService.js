const Task = require('../models/Task');
const { ObjectId } = require('mongodb');

async function buscarTaskPorUsuario(userId, nome) {
    console.log(`Pesquisa de tarefas para o usuário com ID: ${userId} e nome: ${nome}`);

    try {
        const regex = new RegExp(nome,'i');
        console.log(`Condição de consulta: { user: ${userId}, name: { $regex: ${regex} } }`);
        const tasksEncontradas = await Task.find({ user: new ObjectId(userId), name: { $regex: regex } });
        console.log(`Tarefas encontradas - ${tasksEncontradas}`);
        

        return tasksEncontradas;
    } catch (error) {
        console.error('Erro ao buscar tarefas por usuário e nome:', error);
        throw error; 
    }
}

module.exports = {
    buscarTaskPorUsuario
};
