'use strict';

//registrando a categoria model
//importando o model de cateogira através do nome colocado na exportação ná página da model.
const repository = require("../repositories/categoria-repository");
const ctrlBase = require("../bin/base/controller-base");
const _repo = new repository();
const validation = require("../bin/helpers/validation");
/*
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
*/
function categoriaController() {}

//C R U D

//representa o objeto protótipo da function
categoriaController.prototype.post = async (req, res) => {
  //criando uma categoria que recebe o que está vindo do body, através da controller base
  let _validationContract = new validation();

  _validationContract.isRequired(req.body.titulo, "Titulo obrigatório");
  //_validationContract.isRequired(req.body.foto, "A foto é obrigatória");

  ctrlBase.post(_repo, _validationContract, req, res);

  /*trata a requisição da rota, resolve e retorna.
return modelo.save(); */
};

categoriaController.prototype.put = async (req, res) => {
  //findByIdAndUpdate é uma das diversas funções do mongo
  //forma de se passar o id: req.params.id, e depois está setandp as informações vindas do body(olhar no controller base)
  let _validationContract = new validation();
  _validationContract.isRequired(req.body.titulo, "Titulo obrigatório");
  _validationContract.isRequired(req.body.foto, "A foto é obrigatória");
  _validationContract.isRequired(
    req.body.params.id,
    "O id que será atualizado é obrigatório"
  );

  ctrlBase.put(_repo, _validationContract, req, res);
  //return categoria.findById(req.params.id);
};

categoriaController.prototype.get = async (req, res) => {
  //retornando o id no console
  console.log('peguei a informação na categoria', req.usuarioLogado.user._id);
  //retornando os dados em json no console
  console.log('peguei a informação na categoria', req.usuarioLogado);


  ctrlBase.get(_repo, req, res);
  //return categoria.find();
};

categoriaController.prototype.getById = async (req, res) => {
  ctrlBase.getById(_repo, req, res);
  //return categoria.findById(req.params.id);
};

categoriaController.prototype.delete = async (req, res) => {
  ctrlBase.delete(_repo, req, res);
  //return categoria.findByIdAndRemove(req.params.id);
};

module.exports = categoriaController;
