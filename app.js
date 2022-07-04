const express = require('express');
const rescue = require('express-rescue');

const productsController = require('./controllers/productsController');

const app = express();

console.log('Iniciando o projeto usando docker');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', rescue(productsController.getAll));

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;