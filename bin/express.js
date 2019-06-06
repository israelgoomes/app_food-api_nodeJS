//importando o express
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const variables = require('../bin/configuration/variables');
//const auth = require('../middlewares/authentication');

//routes
const categoriaRouter = require('../routes/categoria-routes');
const produtoRouter = require('../routes/produtos-routes');
const usuarioRouter = require('../routes/usuario-router');
//gerando o primeiro servidor de api, app será o servidor.
const app = express();
//importando o body-parser
app.use(bodyParser.json());
//identificando a url e substituindo alguns caracteres estranhos
app.use(bodyParser.urlencoded({extended: false}));

//configurando a conexão com i banco de dados
mongoose.connect(variables.Database.connection);

//Confirando o auth para todas as rotas de uma vez só:
//app.use(auth);


//configurando as rotas
app.use('/api/categoria', categoriaRouter);
app.use('/api/produto', produtoRouter);
app.use('/api/usuario', usuarioRouter);



//exportando o módulo
module.exports = app;