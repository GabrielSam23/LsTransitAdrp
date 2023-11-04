const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Esta linha serve os arquivos estáticos da pasta 'public'

let busStatus = {}; // Armazena o status atual do ônibus por linha

app.post('/updateBusStatus', (req, res) => {
  const { line, status } = req.body;
  if (line && (status === 'red' || status === 'green')) {
    busStatus[line] = status;
    res.status(200).send('Status do ônibus atualizado com sucesso.');
  } else {
    res.status(400).send('Requisição inválida.');
  }
});

app.get('/getBusStatus', (req, res) => {
  res.json(busStatus);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/a.html'); // Substitua 'public/index.html' pelo caminho correto do seu arquivo HTML principal
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
