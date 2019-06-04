'use strict'

const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const repository = require('../repositories/usuario-repository');
const _repo = new repository();
const validation = require('../bin/helpers/validation');
//Não é necessário fazer o new no controller base pois foi feito um export direto nele (exports.put, etc ..), quando é feito um repositório com class ou function, é necessário dar um new
const ctrlBase = require('../bin/base/controller-base');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const variables = require('../bin/configuration/variables');

function usuarioController(){
    
}

usuarioController.prototype.get = async (req, res) => {
  ctrlBase.get(_repo, req, res);
}

usuarioController.prototype.getById = async (req, res) => {
   ctrlBase.getById(_repo, req, res);
}

//criando e autenticando o post de usuários.
usuarioController.prototype.post = async (req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.nome, 'Informe seu nome');
    //tornando obrigatório o email
    _validationContract.isRequired(req.body.email, 'Informe seu email');
    //validando se é um email
    _validationContract.isEmail(req.body.email, 'Email inválido!');
    _validationContract.isRequired(req.body.senha, 'Senha obrigatória');
    _validationContract.isRequired(req.body.senhaConfirmacao, 'Senha de confirmação é obrigatória');
    _validationContract.isTrue(req.body.senha != req.body.senhaConfirmacao, 'As senhas não coincidem');

    let usuarioIsEmailExiste = await _repo.isEmailExiste(req.body.email);
    if(usuarioIsEmailExiste){
        _validationContract.isTrue((usuarioIsEmailExiste.nome != undefined), `Já existe o e-mail ${req.body.email} cadastrado em nossa base.`);
    }
    //criptografa a senha do usuário
    req.body.senha = md5(req.body.senha);   
   ctrlBase.post(_repo, _validationContract, req, res);
}

usuarioController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, 'Informe seu nome');
    _validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    _validationContract.isEmail(req.body.email, 'O e-mail informado não é válido');
    _validationContract.isRequired(req.params.id, 'Informe o id do usuário que será editado');

    let usuarioIsEmailExiste = await _repo.isEmailExiste(req.body.email);
    if(usuarioIsEmailExiste){
        _validationContract.isTrue((usuarioIsEmailExiste.nome != undefined) && (usuarioIsEmailExiste._id != req.params.id),
        `Já existe o e-mail ${req.body.email} cadastrado em nossa base` );
    }

    ctrlBase.put(_repo, _validationContract, req, res);

}

usuarioController.prototype.delete = async (req, res) => {
  ctrlBase.delete(_repo, req, res);
}

usuarioController.prototype.autenticar = async(req, res) => {
  let _validationContract = new validation();
  _validationContract.isRequired(req.body.email, 'Informe seu email');
  _validationContract.isEmail(req.body.email, 'O email informado é inválido!');
  _validationContract.isRequired(req.body.senha, 'Informe sua senha');

  //se o validation for false irá exibir a mensagem
  if(!_validationContract.isValid()){
    res.status(400).send({message: 'Não foi possível efetuar o login', validation: _validationContract.errors() });
    return;
  }
  //caso esteja tudo certo será feito a autenticação pelo repositório que tem o método authenticate.
 let usuarioEncontrado = await _repo.authenticate(req.body.email, req.body.senha);
      //se houver usuário é gerado um token e devolvido para o usuario final.
      if(usuarioEncontrado){
        res.status(200).send({
          //mandando uma propriedade com os dados do usuario caso queira armazenar, colocando nome, email, etc
          usuario: usuarioEncontrado,
          //mandando um token assinando o usuarioEncontrado, ou seja, enviando um token e um usuário
          token: jwt.sign({ user: usuarioEncontrado}, variables.Security.secretyKey)
        })
        //caso usuário não seja encontrado
      }else {
          res.status(404).send({message: 'Usuário e senha informado são inválidos'});
      }
}

module.exports = usuarioController;