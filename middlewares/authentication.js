'use strict'
const jwt = require('jsonwebtoken');
const variables = require('../bin/configuration/variables');
//o next serve para definir se irá continuar ou parar no middlewares, por exemplo em um login não autorizado.
module.exports = async(req, res, next) => {
    //procurando o token de 3 formas diferentes
let token =  req.body.token || req.query.query || req.headers['user-token'];
if(token){

    try {
        //a minha informação decodificada, Verificando o token
        let decoded = await jwt.verify(token, variables.Security.secretyKey);
        //pegando o token já validado, o que significa que o usuario está logado e guardando em req.usuarioLogado. Pode ser usado depois para exibir qual usuário está logado e quais permissões ele tem, por exemplo.
        req.usuarioLogado = decoded;
        next();
    } catch (error) {
        res.status(401).send({message: 'O token informado é inválido'});
        return;
    }
}else{
    res.status(401).send({message: 'Você precisa digitar um token para acessar esse recurso.'});
    return;
}
}