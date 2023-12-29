const express = require('express')
const db = require('./src/config/db')
const cors = require('cors');
const port = 3000
const app = express()

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a nossa API' });
});

db.connectMongoDb()
.then(() => {
    app.listen(port, () => {
        console.log(`Servidor sendo rodado na porta ${port}`);
      });
}).catch((err) => {
    console.error('Falha ao Conectar', err);
});
