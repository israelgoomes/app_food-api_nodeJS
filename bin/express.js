//importando o express
const express = require('express');
const bodyParser = require('body-parser');

//routes
const categoriaRouter = require('../routes/categoria-routes');
const produtoRouter = require('../routes/produtos-routes');

//gerando o primeiro servidor de api, app será o servidor.
const app = express();
//importando o body-parser
app.use(bodyParser.json());
//identificando a url e substituindo alguns caracteres estranhos
app.use(bodyParser.urlencoded({extended: false}));


//configurando as rotas
app.use('/api/categoria', categoriaRouter);
app.use('/api/produto', produtoRouter);



//exportando o módulo
module.exports = app;