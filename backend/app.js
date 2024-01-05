require('dotenv').config();
const express = require('express');
const db = require('./src/config/db');
const cors = require('cors');
const port = 3000 ;
const authRouter = require('./src/routes/authRouter');
const taskRouter = require('./src/routes/taskRouter');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/task', taskRouter);

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem-vindo à nossa API, API para Lista de Tarefas' });
});

db.connectMongoDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    })
    .catch((err) => {
        console.error('Falha ao conectar', err);
    });
