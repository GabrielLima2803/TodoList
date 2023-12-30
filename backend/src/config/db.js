const mongoose = require('mongoose');

async function connectMongoDb() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/TodoList');
        console.log(`Conectado ao banco`)
    } catch (error) {
        console.error('Falha ao conectar ao banco de dados', error)
    }
}

module.exports = {
    connectMongoDb,
}
